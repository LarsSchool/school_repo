#include "Sender.h"
#include "PID.h"
#include "Timer.h"
#include "ServoMotor.h"
#include "IrSensor.h"

void setup() {
  Serial.begin(115200);
  dataSetup();
  setupServoMotor();
  setupIrSensor();
  setupTimer();
  draaiMotor(0, 0);
//  controllerSetup();
}

void loop() {
  updateAlleWipwaps();
  sendAllPatients();
  updateAlleWipwaps();
}
