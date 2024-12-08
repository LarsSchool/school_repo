#include "canConfigSend.h"
#include "canMeasurementRead.h"
#include "debug.h"

void setup() {
  Serial.begin(115200);
  canSetup();
  fillTable();
  resetConfig();
  // testCAN();
  checkCompletion();
}

void loop() {
  sendConfig();
  checkCompletion();
  checkMeasurementMessage();
}