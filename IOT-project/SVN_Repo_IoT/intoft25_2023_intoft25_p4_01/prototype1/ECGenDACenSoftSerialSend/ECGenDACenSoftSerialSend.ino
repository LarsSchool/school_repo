void setup() 
{
  dacSetup();
  SoftSerialSetup();
}

void loop() 
{
  ecgSend();
  printHeartBeat();
}
