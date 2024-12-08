void setup() {
  Serial.begin(9600);
  SoftSerialSetup();
}

void loop() { readAndSendSoftSerial(); }
