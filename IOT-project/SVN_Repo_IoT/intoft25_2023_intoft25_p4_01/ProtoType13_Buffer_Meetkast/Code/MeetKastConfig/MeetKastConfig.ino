#include "Can.h"
#include "debug.h"
#include "Buffer.h"
#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  mockData();
  canSetup();
  setupBuffer();
  setupLeds();
  //fillBufferWithOneMessageTest();
  //fullyFillTheBuffer();
}

void loop() {
  readConfigCan();
//  Serial.println("Voor");
  sendMeasurements();
//  Serial.println("Na");
}
