
//unsigned short cholesterol = 4;
//unsigned short hemoglobine = 9;
//unsigned short onderdruk = 90;
//unsigned short bovendruk = 120;

void setup() {
  Serial.begin(115200);
  //  SoftSerialSetup();
  canSetup();
}

void loop() {
  //  mockData();
  canSend();
}
