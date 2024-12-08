const uint8_t COUNT_MEETWAARDE = 3;

String getFromMMU(String patientid, String meetWaardeId) {
  String destination = "http://192.168.4.1/" + patientid + "/" + meetWaardeId;
  const char* adres = destination.c_str();
  return httpGETRequest(adres);
}

int CountPatient() {
  const char* adres = "http://192.168.4.1/patientCount";
  String returnCount = httpGETRequest(adres);
  return returnCount.toInt();
}

String IntToString(uint8_t value) {
  return String(value);
}

void getAllPatient(uint8_t countPatient) {
  for (uint8_t i = 0; i < countPatient; i++) {
    for (uint8_t j = 0; j < COUNT_MEETWAARDE; j++) {
      printPatientMeetwaarde(IntToString(i), getFromMMU(IntToString(i), IntToString(j)));
    }
  }
}

void printPatientMeetwaarde(String patientId, String meetwaarde) {
  Serial.println("PatientId: " + patientId + " meetwaarde: " + meetwaarde);
}
