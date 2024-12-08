#include "Can.h"
#include "debug.h"
#include "Buffer.h"


void setup() {
  serialBegin(115200);
  mockData();
  canSetup();
  setupBuffer();
  setupLeds();
  fullyFillTheBuffer();
}

void loop() {
  readConfigCan();
  //sendMeasurements();
  sendCanMessages();
  fullyFillTheBuffer();
}
