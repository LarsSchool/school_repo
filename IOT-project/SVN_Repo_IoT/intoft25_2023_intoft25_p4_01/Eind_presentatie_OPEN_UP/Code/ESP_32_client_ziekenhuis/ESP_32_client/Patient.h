#ifndef Patient_h
#define Patient_h
#include <Arduino.h>
#include "Wifi.h"

String getFromMMU(String patientid, String measurementId);
uint8_t getCountPatient();
String intToString(uint8_t value);
void getAllPatient();
void printPatientmeasurement(String patientId, String measurement);
void updateMeasurement(uint8_t patientId, uint8_t measurementId, String measurement);
String makePageWithPatientAllData();
void fillArray();

#endif
