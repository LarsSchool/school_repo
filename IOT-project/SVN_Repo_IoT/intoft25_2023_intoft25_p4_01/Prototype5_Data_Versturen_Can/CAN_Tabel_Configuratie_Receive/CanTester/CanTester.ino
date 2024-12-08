#include "Can.h"

void setup() {
  Serial.begin(115200);
  canSetup();
  mockData();
  printConfigTable();
}

void loop() {
  // put your main code here, to run repeatedly:
}
