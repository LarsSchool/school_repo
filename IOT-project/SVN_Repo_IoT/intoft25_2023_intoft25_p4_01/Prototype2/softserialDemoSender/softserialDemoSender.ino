void setup() {
  SoftSerialSetup();
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  sendData();
}
