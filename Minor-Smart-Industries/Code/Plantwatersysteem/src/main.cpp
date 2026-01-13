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

#define TRANSMITTERID1 202504
#define rfPin 25

const uint8_t DELAY_BETWEEN_LOOPS_MS = 150;
uint64_t startLoopTime;

void setup() {
  setDebugMode(false); // Enable or disable debug prints.

  Serial.begin(9600);
  Serial.println("Started the setup sequence.");

  softwareTimerSetup();

  // Only needed if the KaKu hasnt been plugged in and isnt set up from a
  // previous run, but can be on everytime just in case. If the KaKu hasnt been
  // setup, plug it in and then run the setup directly after, you have a window
  // of around 10-20 seconds to do this.
  setupKaKu();

  setupLDR();
  setupMoist();
  setupWaterPump();
  setupDHT();
  setupOLED();

  // setupWifi();

  Serial.println("Starting the loop sequence.");
  startLoopTime = millis();
}

void loop() {
  if (millis() - startLoopTime > DELAY_BETWEEN_LOOPS_MS) {
    loopKaKu();
    currentTimeMillis = millis();

    loopLDR();
    currentTimeMillis = millis();
    loopMoist();
    currentTimeMillis = millis();
    loopWaterPump();
    currentTimeMillis = millis();
    loopDHT();
    currentTimeMillis = millis();
    loopOLED();
    currentTimeMillis = millis();

    // loopWifi();
    // currentTimeMillis = millis();

    startLoopTime = millis();
  }
}
