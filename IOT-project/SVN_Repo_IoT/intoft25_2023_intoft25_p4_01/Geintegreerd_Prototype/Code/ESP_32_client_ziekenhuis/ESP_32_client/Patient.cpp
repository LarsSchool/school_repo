#include "Patient.h"
#include "staticPage.h"

String patientsData[PATIENT_COUNT][MEASURMENT_COUNT];

String getFromMMU(String patientid, String measurementId) {
  String destination = "http://192.168.4.1/" + patientid + "/" + measurementId;
  const char* adres = destination.c_str();
  Serial.print("Adres = ");
  Serial.println(adres);
  String measurement = httpGETRequest(adres);
  updateMeasurement(patientid.toInt(), measurementId.toInt() + 1, measurement);
  return measurement;
}

uint8_t getCountPatient() {
  const char* adres = "http://192.168.4.1/patientCount";
  String returnCount = httpGETRequest(adres);
  Serial.println("aantal patienten: " + returnCount);
  return returnCount.toInt();
}

String intToString(uint8_t value) {
  return String(value);
}

void getAllPatient() {
  for (uint8_t patientId = 0; patientId < getCountPatient(); patientId++) {
    for (uint8_t measurementId = 0; measurementId < MEASURMENT_COUNT; measurementId++) {
      printPatientmeasurement(intToString(patientId), getFromMMU(intToString(patientId), intToString(measurementId)));
    }
  }
}

void printPatientmeasurement(String patientId, String measurement) {
  Serial.println("PatientId: " + patientId + " measurement: " + measurement);
}

void updateMeasurement(uint8_t patientId, uint8_t measurementId, String measurement) {
  if (measurement.length() <= 5 && measurement.length() != 0) {
    patientsData[patientId][measurementId] = measurement;
  }
}

String makePageWithPatientAllData() {
  return makePage(patientsData);
}

void fillArray() {
  for (uint8_t patients_number = 0; patients_number < PATIENT_COUNT; patients_number++) {
    patientsData[patients_number][0] = intToString(patients_number);
    for (uint8_t measurement_number = 1; measurement_number < MEASURMENT_COUNT; measurement_number++) {
      patientsData[patients_number][measurement_number] = "0";
    }
  }
}
