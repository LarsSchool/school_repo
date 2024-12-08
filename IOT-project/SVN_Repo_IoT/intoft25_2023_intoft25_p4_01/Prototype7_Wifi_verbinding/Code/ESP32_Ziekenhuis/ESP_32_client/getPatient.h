#ifndef getPatient_h
#define getPatient_h
#include <Arduino.h>
#include "Wifi.h"

String getFromMMU(String patientid, String meetWaardeId);
uint8_t countPatient();
String intToString(uint8_t value);
void getAllPatient(uint8_t countPatient);
void printPatientMeetwaarde(String patientId, String meetwaarde);

#endif