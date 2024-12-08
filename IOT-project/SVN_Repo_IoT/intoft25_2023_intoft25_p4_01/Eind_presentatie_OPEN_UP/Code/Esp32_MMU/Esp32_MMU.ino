#include "WifiServer.h"
#include "CanConfigSend.h"
#include "CanMeasurementRead.h"
#include "Debug.h"

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
  // size_t freeHeap = ESP.getFreeHeap();
  // Serial.print("1. Free heap size voor sendconfig: ");
  // Serial.print(freeHeap);
  // Serial.println(" bytes");
  sendConfig();
  // freeHeap = ESP.getFreeHeap();
  // Serial.print("2. Free heap size tussen sendconfig: ");
  // Serial.print(freeHeap);
  // Serial.println(" bytes");
  checkMessage();
  // freeHeap = ESP.getFreeHeap();
  // Serial.print("3. Free heap size na checkmessage: ");
  // Serial.print(freeHeap);
  // Serial.println(" bytes");
}
