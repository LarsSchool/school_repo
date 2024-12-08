//lengte wipwap is 40 cm ongeveer
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  setupServoMotor();
  setupIrSensor();
  setTimer();
}

void loop() {
  updateWaarde();
}