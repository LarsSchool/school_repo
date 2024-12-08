#include "Sender.h"

uint8_t faseHandShake = 0;
long dataArray[DIFFERENTMACHINEAMOUNT][DIFFERENTARRAYDATA];

void dataSetup() {
//  id2 = 0;
//  machineId = 0;
}

uint8_t mockHeartRate() {
  const int minPotValue = 0;
  const int maxPotValue = 1023;

  const int minOutputValue = 50;
  const int maxOutputValue = 220;

  int potValue = analogRead(POTMETER);
  uint8_t hartslag =
    map(potValue, minPotValue, maxPotValue, minOutputValue, maxOutputValue);
  return hartslag;
}

void sendPatientData(uint8_t patientId) {
  uint8_t cholesterol = (rand() % 5) + 1;
  uint8_t hemoglobine = (rand() % 11) + 8;
  uint8_t bovendruk = (rand() % 120) + 80;
  uint8_t onderdruk = (rand() % 90) + 60;
  uint8_t hartslag = mockHeartRate();
  addDataToPatientArray(CHOLESTEROL, patientId, cholesterol, TEMPGLOBALPIN);
  addDataToPatientArray(HEMOGLOBINE, patientId, hemoglobine, TEMPGLOBALPIN);
  addDataToPatientArray(BOVENDRUK, patientId, bovendruk, TEMPGLOBALPIN);
  addDataToPatientArray(ONDERDRUK, patientId, onderdruk, TEMPGLOBALPIN);
  addDataToPatientArray(HARTSLAG, patientId, hartslag, TEMPGLOBALPIN);
  sendPercentage(patientId);
  for (int machineId = 0; machineId < DIFFERENTMACHINEAMOUNT; machineId++) {
    Serial.print("Machine ");
    Serial.print(machineId);
    Serial.print(" - ");
    sendData(machineId);
    for (int dataId = 0; dataId < DIFFERENTARRAYDATA; dataId++) {
      Serial.print(dataArray[machineId][dataId]);
      Serial.print(" ");
    }
  }
  Serial.println();
}

void addDataToPatientArray(uint8_t id, uint8_t patientId, uint8_t data, uint8_t pin){
  dataArray[id-1][0] = patientId;
  dataArray[id-1][1] = data;
  dataArray[id-1][2] = pin;
}

uint8_t combineId(uint8_t machineId, uint8_t patientId) {
  return machineId * 10 + patientId;
}

void sendAllPatients() {
  for (uint8_t patientId = 0; patientId < DIFFERENTPATIENTAMOUNT; patientId++) {
    sendPatientData(patientId);
  }
}

void sendPercentage(uint8_t patientId) {
  double percentage;
  double waarde = get_dist(patientId,10);
  if (waarde <= 15) {
    percentage = map(waarde, 0, 15, 65, 95);
  } else {
    percentage = map(waarde, 16, 31, 95, 100);
  }
  addDataToPatientArray(PERCENTAGE, patientId, percentage, TEMPGLOBALPIN);
}

void sendData(uint8_t id) {
  readAndSendData(id); 
  while (faseHandShake != 0)        // blijf de functie aanroepen totdat die klaar is
                                    // en gereset, volgende data kan worden verzonden.
  {
    readAndSendData(id);
  }
}

void readAndSendData(uint8_t machineId)
{
  
}
