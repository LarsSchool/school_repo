#include "Can.h"
#include "debug.h"

void setup() {
  serialBegin(115200);
  //mockData();
  canSetup();
}

void loop() {
  // put your main code here, to run repeatedly:
  readConfigCan();
  sendMeasurements();
 }
