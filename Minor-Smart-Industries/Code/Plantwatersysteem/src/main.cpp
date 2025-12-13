#include <Arduino.h>
#include <vector>

// See the actual loop and setup at the bottom of the page.
// I decided to keep the code in one file, since its such little code that it would be more of a hassle to seperate
// it into multiple .c and .h files than it is to keep this readable. I have already seperated the code into sections,
// so its easier to read and seperate it into multiple files, if needed.

// Software timer(s) code
// ------------------------------------------------------------------------------------------------------------
enum Components {
  LDRSensor,
  Moist,
  WaterPump,
  DHTSensor,
  KaKu,
  WiFiComponent,
  OLEDDisplay
};

uint8_t numberOfComponents = 7;
uint64_t currentTimeMillis = millis();

std::vector<uint64_t> timers(numberOfComponents, 0);

void softwareTimerSetup() {
  timers[LDRSensor] = currentTimeMillis;
  timers[Moist] = currentTimeMillis;
  timers[WaterPump] = currentTimeMillis;
  timers[DHTSensor] = currentTimeMillis;
  timers[KaKu] = currentTimeMillis;
  timers[WiFiComponent] = currentTimeMillis;
  timers[OLEDDisplay] = currentTimeMillis;
}

// OLED Display screen Code
// ------------------------------------------------------------------------------------------------------------

#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Arduino.h>
#include <Wire.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setupOLED() {
  // Initialize the OLED display
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;);
  }

  display.clearDisplay();
  display.display();
}

void loopOLED() {
  if (currentTimeMillis - timers[OLEDDisplay] < 300) {

    // Clear the display before each frame
    display.clearDisplay();

    // Display "MSI IoT" in the middle of the screen
    display.setTextSize(2);              // Set text size
    display.setTextColor(SSD1306_WHITE); // Set text color
    display.setCursor(25, 40);           // Set text position
    display.println(F("MSI IoT"));       // Display the text

    // Display the frame on the OLED
    display.display();

    timers[OLEDDisplay] = currentTimeMillis;
  }
}

// KaKu switch code
// ------------------------------------------------------------------------------------------------------------

// #include "switchKaKu.h"
// #define TRANSMITTERID1 202504
// #define rfPin 25

// void setup() {

// }

// void loop() {
//   switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
//   delay(500);
// }

#include "switchKaKu.h"
#define TRANSMITTERID1 202504 //
// Program transmitterID like this:
// https://www.robotexchange.io/t/appendix-programming-the-klikaanklikuit/862
#define rfPin 25
bool kakuStateOn = false;

void setupKaKu() {
  for (uint8_t i = 0; i < 3; i++) {
    switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
    delay(500);
  }
}

void loopKaKu() {
  if (currentTimeMillis - timers[KaKu] > 1000 && !kakuStateOn) {
    switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
    kakuStateOn = true;
  } else if (currentTimeMillis - timers[KaKu] > 1000 && kakuStateOn) {
    switchKaku(rfPin, TRANSMITTERID1, 1, 1, false, 3);
    kakuStateOn = false;
    timers[KaKu] = currentTimeMillis;
  }
}

// DHT sensor code
// ------------------------------------------------------------------------------------------------------------

#include "DHT.h"

#define DHTPIN 32
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setupDHT() {
  Serial.println(F("DHT11 test!"));
  dht.begin();
}

void loopDHT() {
  if (currentTimeMillis - timers[DHTSensor] > 1000) {

    float h = dht.readHumidity();
    float t = dht.readTemperature();

    if (isnan(h) || isnan(t)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }

    Serial.print(F("Humidity: "));
    Serial.print(h);
    Serial.print(F("%  Temperature: "));
    Serial.print(t);
    Serial.println(F("°C "));

    timers[DHTSensor] = currentTimeMillis;
  }
}

// Water pump/ relay code
// ------------------------------------------------------------------------------------------------------------
uint8_t waterPumpPin = 33;
bool pumpStateOn = false;

void setupWaterPump() { pinMode(waterPumpPin, OUTPUT); }

void loopWaterPump() {
  if (currentTimeMillis - timers[WaterPump] > 1000 && !pumpStateOn) {
    Serial.println("Pump is now on");
    digitalWrite(waterPumpPin, HIGH);
    pumpStateOn = true;
    timers[WaterPump] = currentTimeMillis;

  } else if (currentTimeMillis - timers[WaterPump] > 1000 && pumpStateOn) {
    Serial.println("Pump is now off");
    digitalWrite(waterPumpPin, LOW);
    pumpStateOn = false;
    timers[WaterPump] = currentTimeMillis;
  }
}

// Moist sensor code
// --------------------------------------------------------------------------------------------------------

// Set pin number
uint8_t moistSensPin = 36;
uint32_t moistValue = 0;

void setupMoist() {}

void loopMoist() {
  if (currentTimeMillis - timers[Moist] > 1000) {
    moistValue = analogRead(moistSensPin);
    Serial.print("Moisture Value = ");
    Serial.println(moistValue);

    timers[Moist] = currentTimeMillis;
  }
}

// LDR code
// -----------------------------------------------------------------------------------------------------------

const int ldrPin = 39;
const int ledPin = 2;

int lightInitial;
int lightValue;

void setupLDR() {
  pinMode(ldrPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.println("LDR setup test");
  lightInitial = analogRead(ldrPin);
}

void loopLDR() {
  if (currentTimeMillis - timers[LDRSensor] > 100) {
    lightValue = analogRead(ldrPin);
    Serial.print("lightvalue: ");
    Serial.println(lightValue);
    if (lightInitial - lightValue >= 200) {
      digitalWrite(ledPin, HIGH);
    }

    else {
      digitalWrite(ledPin, LOW);
    }
    timers[LDRSensor] = currentTimeMillis;
  }
}

// WiFi code
// ------------------------------------------------------------------------------------------------------------
#include <InfluxDbClient.h>
#include <InfluxDbCloud.h>
#include <WiFiMulti.h>
#include <math.h>

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

// Wi-Fi and Influx settings
WiFiMulti wifiMulti;

const char *WIFI_SSID = "Hoangs_Hotspot";
const char *WIFI_PASSWORD = "jobbie123";
// const char *WIFI_SSID = "Lars_Hotspot";
// const char *WIFI_PASSWORD = "test1234";
const char *INFLUXDB_URL = "https://influx.mvrautomatisering.nl";
const char *INFLUXDB_TOKEN =
    "4F4dBCMaBFgYlJOjZi1jcfMXsZV6yrqM8-"
    "AKUR9pnSioGjoSGfRP5K5eHbFhDBY4LXPxDKj8KYIeC7bqTbEdxQ==";
const char *INFLUXDB_ORG = "quintus";
const char *INFLUXDB_BUCKET = "Schroevendraaier_Bucket";

// Set timezone so your data will actually have a correct date and time
const char *TZ_INFO = "CET-1CEST,M3.5.0,M10.5.0/3";

// InfluxDB client instance with preconfigured InfluxCloud certificate
InfluxDBClient client(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET,
                      INFLUXDB_TOKEN, InfluxDbCloud2CACert);

// Point object called deviceStatus with measurment name "devices"
Point deviceStatus("devices");

void setupWifi() {
  // Setup wifi
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

  // This line sets the options for the Influx client. It means that it will
  // send data in batches of size 1 and it will send the data immediately
  // (flushInterval 0)
  client.setWriteOptions(WriteOptions().batchSize(1).flushInterval(0));

  // Here you can add tags as you please.
  deviceStatus.addTag("device", DEVICE);
  deviceStatus.addTag("location", DEVICE_LOCATION);
  deviceStatus.addTag("SSID", WiFi.SSID());

  // Sync time for proper connection and data points
  timeSync(TZ_INFO, "pool.ntp.org", "time.nis.gov");

  // Check server connection
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

    // Clear fields for reusing the point. Tags will remain untouched
    deviceStatus.clearFields();

    // Store measured value into point
    // Report RSSI of currently connected network
    // Write internal temperature
    int16_t t_f = temprature_sens_read();
    int16_t t_c = (t_f - 32) * 5 / 9;
    deviceStatus.addField("Lars-internal_temp", t_c);

    // Write WiFi strength
    int16_t wifiStrength = WiFi.RSSI();
    deviceStatus.addField("Lars-wifi_strength", wifiStrength);

    // Write uptime
    uint64_t uptime = millis() / 1000;
    deviceStatus.addField("Lars-uptime", uptime);

    // Write moisture value
    deviceStatus.addField("Lars-moisture", moistValue);

    // Write LDR value
    deviceStatus.addField("Lars-LDR", lightValue);

    // Write DHT values
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    if (!isnan(h)) {
      deviceStatus.addField("Lars-humidity", h);
    }
    if (!isnan(t)) {
      deviceStatus.addField("Lars-temperature", t);
    }

    // Write pump state
    deviceStatus.addField("Lars-pump_state", pumpStateOn);

    // Write Kaku state
    deviceStatus.addField("Lars-kaku_state", kakuStateOn);

    client.writePoint(deviceStatus);

    // Check Wi-Fi connection and reconnect if needed
    if (wifiMulti.run() != WL_CONNECTED) {
      Serial.println("Wifi connection lost");
    }

    // Write point
    if (!client.writePoint(deviceStatus)) {
      Serial.print("InfluxDB write failed: ");
      Serial.println(client.getLastErrorMessage());
    }

    timers[WiFiComponent] = currentTimeMillis;
    Serial.println("Wait 10s");
  }
}

// Standaard Arduino code om het aan te roepen
// ------------------------------------------------------------------------------------------------------------
void setup() {
  Serial.begin(9600);
  Serial.println("Started the setup sequence.");
  softwareTimerSetup();
  setupLDR();
  setupMoist();
  // setupWaterPump();
  setupDHT();
  // setupKaKu();
  // setupWifi();
  setupOLED();
  Serial.println("Started the loop sequence.");
}

uint64_t startLoopTime = millis();

void loop() {
  if (millis() - startLoopTime > 150) {
  // loopLDR();
  // currentTimeMillis = millis();
  loopMoist();
  currentTimeMillis = millis();
  // loopWaterPump();
  // currentTimeMillis = millis();
  // loopDHT();
  // currentTimeMillis = millis();
  // loopKaKu();
  // currentTimeMillis = millis();
  // loopWifi();
  // currentTimeMillis = millis();
  // loopOLED();
  // currentTimeMillis = millis();
  // Serial.println("Completed loop cycle.");
  startLoopTime = millis();
  }
}
