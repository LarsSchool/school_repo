#include "WiFi_InfluxDB.h"
#include "DHT_sensor.h"
#include "Moist_sensor.h"
#include "LDR_sensor.h"
#include "Waterpump.h"
#include "KaKu.h"
#include <InfluxDbClient.h>
#include <InfluxDbCloud.h>
#include <WiFiMulti.h>
#include <Arduino.h>

#ifdef __cplusplus
extern "C" {
#endif
uint8_t temprature_sens_read();
#ifdef __cplusplus
}
#endif
uint8_t temprature_sens_read();

const char *DEVICE = "ESP32_Lars";
const char *DEVICE_LOCATION = "HAN_gebouw";

WiFiMulti wifiMulti;

const char *WIFI_SSID = "Hoangs_Hotspot";
const char *WIFI_PASSWORD = "jobbie123";
const char *INFLUXDB_URL = "https://influx.mvrautomatisering.nl";
const char *INFLUXDB_TOKEN =
    "4F4dBCMaBFgYlJOjZi1jcfMXsZV6yrqM8-"
    "AKUR9pnSioGjoSGfRP5K5eHbFhDBY4LXPxDKj8KYIeC7bqTbEdxQ==";
const char *INFLUXDB_ORG = "quintus";
const char *INFLUXDB_BUCKET = "Schroevendraaier_Bucket";
const char *TZ_INFO = "CET-1CEST,M3.5.0,M10.5.0/3";

InfluxDBClient client(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET,
                      INFLUXDB_TOKEN, InfluxDbCloud2CACert);

Point deviceStatus("devices");

void setupWifi() {
  WiFi.mode(WIFI_STA);
  wifiMulti.addAP(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Connecting to wifi...");
  while (wifiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  client.setWriteOptions(WriteOptions().batchSize(1).flushInterval(0));

  deviceStatus.addTag("device", DEVICE);
  deviceStatus.addTag("location", DEVICE_LOCATION);
  deviceStatus.addTag("SSID", WiFi.SSID());

  timeSync(TZ_INFO, "pool.ntp.org", "time.nis.gov");

  if (client.validateConnection()) {
    Serial.print("Connected to InfluxDB: ");
    Serial.println(client.getServerUrl());
  } else {
    Serial.print("InfluxDB connection failed: ");
    Serial.println(client.getLastErrorMessage());
  }
}

void loopWifi() {
  if (currentTimeMillis - timers[WiFiComponent] > 5000) {

    deviceStatus.clearFields();

    int16_t t_f = temprature_sens_read();
    int16_t t_c = (t_f - 32) * 5 / 9;
    deviceStatus.addField("Lars-internal_temp", t_c);

    int16_t wifiStrength = WiFi.RSSI();
    deviceStatus.addField("Lars-wifi_strength", wifiStrength);

    uint64_t uptime = millis() / 1000;
    deviceStatus.addField("Lars-uptime", uptime);

    deviceStatus.addField("Lars-moisture", moistValue);
    deviceStatus.addField("Lars-LDR", lightValue);

    float h = getHumidity();
    float t = getTemperature();
    if (!isnan(h)) {
      deviceStatus.addField("Lars-humidity", h);
    }
    if (!isnan(t)) {
      deviceStatus.addField("Lars-temperature", t);
    }

    deviceStatus.addField("Lars-pump_state", pumpStateOn);
    deviceStatus.addField("Lars-kaku_state", kakuStateOn);

    client.writePoint(deviceStatus);

    if (wifiMulti.run() != WL_CONNECTED) {
      Serial.println("Wifi connection lost");
    }

    if (!client.writePoint(deviceStatus)) {
      Serial.print("InfluxDB write failed: ");
      Serial.println(client.getLastErrorMessage());
    }

    timers[WiFiComponent] = currentTimeMillis;
    Serial.println("Wait 10s");
  }
}