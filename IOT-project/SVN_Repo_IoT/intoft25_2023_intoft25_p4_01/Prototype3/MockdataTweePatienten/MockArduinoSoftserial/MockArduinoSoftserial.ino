void setup() {
  Serial.begin(115200);
  softSerialSetup();
  setupServoMotor();
  setupIrSensor();
  setupTimer();
  draaiMotor(0, 0);
//  controllerSetup();
}

void loop() {
  updateAlleWipwaps();
  send2Patients();
  updateAlleWipwaps();
}
