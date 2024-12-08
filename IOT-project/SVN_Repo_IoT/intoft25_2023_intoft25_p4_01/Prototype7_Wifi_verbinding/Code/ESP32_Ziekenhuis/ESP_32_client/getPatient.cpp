#include "getPatient.h"

const uint8_t COUNT_MEETWAARDE = 3;

String getFromMMU(String patientid, String meetWaardeId) {
  String destination = "http://192.168.4.1/" + patientid + "/" + meetWaardeId;
  const char* adres = destination.c_str();
  return httpGETRequest(adres);
}

uint8_t countPatient() {
  const char* adres = "http://192.168.4.1/patientCount";
  String returnCount = httpGETRequest(adres);
  return returnCount.toInt();
}

String inttoString(uint8_t value) {
  return String(value);
}

void getAllPatient(uint8_t countPatient) {
  for (uint8_t patientId = 0; patientId < countPatient; patientId++) {
    for (uint8_t meetWaardeId = 0; meetWaardeId < COUNT_MEETWAARDE; meetWaardeId++) {
      printPatientMeetwaarde(inttoString(patientId), getFromMMU(inttoString(patientId), inttoString(meetWaardeId)));
    }
  }
}

void printPatientMeetwaarde(String patientId, String meetwaarde) {
  Serial.println("PatientId: " + patientId + " meetwaarde: " + meetwaarde);
}
