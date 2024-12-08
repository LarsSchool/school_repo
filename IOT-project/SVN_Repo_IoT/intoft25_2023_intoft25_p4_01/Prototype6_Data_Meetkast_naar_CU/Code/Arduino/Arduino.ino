const byte DIFFERENTPATIENTAMOUNT = 2;
const byte DIFFERENTMACHINEAMOUNT = 7;
long patientData[DIFFERENTPATIENTAMOUNT][DIFFERENTMACHINEAMOUNT];

void setup() {
  Serial.begin(115200);
  canSetup();
  SoftSerialSetup();
}

void loop()
{
  for (int patientId = 0; patientId < DIFFERENTPATIENTAMOUNT; ++patientId) {
    patientData[patientId][0] = ReadAndPrintDacSignal(patientId);
  }
  
  readAndSendSoftSerial(patientData);
  canSend();

//  for (int patientId = 0; patientId < DIFFERENTPATIENTAMOUNT; ++patientId) {
//    for (int machineId = 0; machineId < DIFFERENTMACHINEAMOUNT; ++machineId) {
//      Serial.print(patientData[patientId][machineId]);
//      Serial.print(" ");
//    }
//  }
//  Serial.println();
}
