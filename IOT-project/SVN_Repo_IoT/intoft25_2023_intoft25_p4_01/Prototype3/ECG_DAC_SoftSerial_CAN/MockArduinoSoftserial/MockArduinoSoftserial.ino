void setup() {
  Serial.begin(115200);
  softSerialSetup();
  setupServoMotor();
  setupIrSensor();
  setTimer();
}

void loop() { 
  sendPatientData(); 
  updateWaarde();
 }