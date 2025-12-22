// ...existing code...
#include <Arduino.h>

#include "common.h"
#include "LDR_sensor.h"
#include "Moist_sensor.h"
#include "Waterpump.h"
#include "DHT_sensor.h"
#include "KaKu.h"
#include "WiFi_InfluxDB.h"
#include "OLED_display.h"

void setup() {
  Serial.begin(9600);
  Serial.println("Started the setup sequence.");
  softwareTimerSetup();
  setupLDR();
  setupMoist();
  setupWaterPump();
  setupDHT();
  // setupKaKu();
  // setupWifi();
  setupOLED();
  Serial.println("Started the loop sequence.");
}

uint64_t startLoopTime = millis();

void loop() {
  if (millis() - startLoopTime > 150) {
    loopLDR();
    currentTimeMillis = millis();
    loopMoist();
    currentTimeMillis = millis();
    loopWaterPump();
    currentTimeMillis = millis();
    loopDHT();
    currentTimeMillis = millis();
    // loopKaKu();
    // currentTimeMillis = millis();
    // loopWifi();
    // currentTimeMillis = millis();
    loopOLED();
    currentTimeMillis = millis();
    // Serial.println("Completed loop cycle.");
    startLoopTime = millis();
  }
}
