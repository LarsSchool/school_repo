#include "OLED_display.h"
#include "DHT_sensor.h"
#include "KaKu.h"
#include "LDR_sensor.h"
#include "Moist_sensor.h"
#include "Waterpump.h"
#include "common.h"

#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Arduino.h>
#include <Wire.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

static Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

const uint32_t UPDATE_INTERVAL = 100; // ms

// Each item has its own line
int yTemp = 0;
int yHumidity = 10;
int yMoist = 20;
int yLight = 30;
int yPump = 40;
int yKaku = 50;

void setupOLED() {
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;)
      ;
  }
  display.clearDisplay();
  display.display();
}

void loopOLED() {
  uint32_t currentTimeMillis = millis();
  if (currentTimeMillis - timers[OLEDDisplay] > UPDATE_INTERVAL) {
    display.clearDisplay();
    display.setTextColor(SSD1306_WHITE);
    display.setTextSize(1);

    // Temperature
    display.setCursor(0, yTemp);
    float t = getTemperature();
    display.print("Temp:          ");
    if (!isnan(t)) {
      display.print(t, 1);
      display.print(" C"); // The degrees symbol can sadly not be displayed by
                           // our display, hence why it isnt here.
    } else {
      display.print("--.- C"); // See the comment above
    }

    // Humidity
    display.setCursor(0, yHumidity);
    float h = getHumidity();
    display.print("Humidity:      ");
    if (!isnan(h)) {
      display.print(h, 1);
      display.print(" %");
    } else {
      display.print("--.- %");
    }

    // Moisture
    display.setCursor(0, yMoist);
    display.print("Moist:         ");
    display.println(moistValue);

    // Light
    display.setCursor(0, yLight);
    display.print("Light:         ");
    display.println(lightValue);

    // Pump
    display.setCursor(0, yPump);
    display.print("Pump:          ");
    display.println(pumpStateOn ? "ON" : "OFF");

    // KaKu
    display.setCursor(0, yKaku);
    display.print("KaKu:          ");
    display.println(kakuStateOn ? "ON" : "OFF");

    display.display();
    timers[OLEDDisplay] = currentTimeMillis;
  }
}