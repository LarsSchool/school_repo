#include "DHT_sensor.h"
#include <Arduino.h>
#include <DHT.h>

#define DHTPIN 32
#define DHTTYPE DHT11
static DHT dht(DHTPIN, DHTTYPE);

static float lastHumidity = NAN;
static float lastTemperature = NAN;

void setupDHT() {
  if (getDebugMode()) {
    Serial.println(F("DHT11 test!"));
  }
  dht.begin();
}

void loopDHT() {
  if (currentTimeMillis - timers[DHTSensor] > 1000) {
    float h = dht.readHumidity();
    float t = dht.readTemperature();

    if (isnan(h) || isnan(t)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      timers[DHTSensor] = currentTimeMillis;
      return;
    }

    lastHumidity = h;
    lastTemperature = t;

    if (getDebugMode()) {
      Serial.print(F("Humidity: "));
      Serial.print(h);
      Serial.print(F("%  Temperature: "));
      Serial.print(t);
      Serial.println(F("°C "));
    }

    timers[DHTSensor] = currentTimeMillis;
  }
}

float getHumidity() { return lastHumidity; }
float getTemperature() { return lastTemperature; }