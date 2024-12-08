#include "canConfigSend.h"
#include "canMeasurementRead.h"
#include "debug.h"
#include "Timer.h"
#include "WiFiServer.h"

/* Required libraries for WiFi connection.
https://github.com/lacamera/ESPAsyncWebServer
https://github.com/dvarrel/ESPAsyncTCP 
https://github.com/dvarrel/AsyncTCP */

void setup() {
  Serial.begin(115200);
  wifiSetup();
  canSetup();
  fillTable();
  resetConfig();
  checkCompletion();
}

void loop() {
  sendConfig();
  checkCompletion();
  checkMeasurementMessage();
  printValues();
  if (getTimer(getInterval())) {
    uint32_t randomValue = random(0, 500);
    printPatientData(1, randomValue);
    setTimer();
  }
}
