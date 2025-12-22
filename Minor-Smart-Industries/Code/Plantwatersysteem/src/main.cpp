#include <Arduino.h>

#include "DHT_sensor.h"
#include "KaKu.h"
#include "LDR_sensor.h"
#include "Moist_sensor.h"
#include "OLED_display.h"
#include "Waterpump.h"
#include "WiFi_InfluxDB.h"
#include "common.h"

#include "switchKaKu.h"

#define TRANSMITTERID1 202505
#define rfPin 25

const uint8_t DELAY_BETWEEN_LOOPS_MS = 150;

void setup() {
  // setDebugMode(false); // Enable or disable debug prints.

  // Serial.begin(9600);
  // Serial.println("Started the setup sequence.");

  // softwareTimerSetup();
  // setupLDR();
  // setupMoist();
  // setupWaterPump();
  // setupDHT();
  // setupWifi();
  // setupOLED();
  // setupKaKu();

  // Serial.println("Starting the loop sequence.");
}

uint64_t startLoopTime = millis();

void loop() {

  switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
  delay(500);
  
  // if (millis() - startLoopTime > DELAY_BETWEEN_LOOPS_MS) {
    // loopLDR();
    // currentTimeMillis = millis();
    // loopMoist();
    // currentTimeMillis = millis();
    // loopWaterPump();
    // currentTimeMillis = millis();
    // loopDHT();
    // currentTimeMillis = millis();
    // loopWifi();
    // currentTimeMillis = millis();
    // loopOLED();
    // currentTimeMillis = millis();
    // loopKaKu();
    // currentTimeMillis = millis();

    // startLoopTime = millis();
  // }
}
