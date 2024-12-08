
void setup() {
  Serial.begin(115200);
  canSetup();
  //SoftSerialSetup();
}

void loop() 
{
  canSend();
  ReadAndPrintDacSignal();
//  readHeartBeat();
}                                                                                                         
