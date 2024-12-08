#include "wifiServer.h"
#include "canConfigSend.h"
#include "canMeasurementRead.h"
#include "debug.h"

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
  checkMessage();
}

void loop() {
  sendConfig();
  checkMessage();
}
