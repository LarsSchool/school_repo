#include "sharedValues.h"

void setup() {
  Serial.begin(115200);
  canSetup();
  SoftSerialSetup();
}

void loop()
{
  ReadAndPrintDacSignal(0);
  ReadAndPrintDacSignal(1);
  readAndSendSoftSerial();
  canSend();
  for (int i = 0; i < 2; ++i) {
    for (int j = 0; j < 7; ++j) {
      Serial.print(patientData[i][j]);
      Serial.print(" ");
    }
  }
  Serial.println();
}
