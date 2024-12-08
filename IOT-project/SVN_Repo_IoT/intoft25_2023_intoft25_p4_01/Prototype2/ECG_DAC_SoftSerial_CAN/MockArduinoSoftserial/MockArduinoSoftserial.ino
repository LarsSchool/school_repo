void setup() {
  Serial.begin(115200);
  softSerialSetup();
  setupServoMotor();
  setupIrSensor();
  setTimer1();
  setTimer2();
}

void loop() { 
  sendPatientData();
  updateWaarde1();
//  updateWaarde2();
 }
