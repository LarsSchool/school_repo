void setup() 
{
  Serial.begin(115200);
  dacSetup();
  SoftSerialSetup();
}

void loop() 
{
  setPauseLength();
  ecgSend();
  printHeartBeat();
}
