#include "sharedValues.h"

void setup() {
  Serial.begin(115200);
  canSetup();
  SoftSerialSetup();
}

void loop() 
{
  ReadAndPrintDacSignal();
  Serial.print(" ");
  readAndSendSoftSerial();
  Serial.print(globalCholesterol);  
  Serial.print(" "); 
  Serial.print(globalHemoglobine);
  Serial.print(" ");
  Serial.print(globalBovendruk);
  Serial.print(" ");
  Serial.print(globalOnderdruk);
  Serial.print(" ");
  Serial.print(globalHartslag);
  Serial.print(" ");
  Serial.print(globalZuurstof);
  canSend();
  Serial.println();
}  
