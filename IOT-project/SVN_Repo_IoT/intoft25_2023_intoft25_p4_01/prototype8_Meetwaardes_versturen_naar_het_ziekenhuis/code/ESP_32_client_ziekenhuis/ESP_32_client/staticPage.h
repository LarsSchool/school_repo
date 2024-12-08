#ifndef staticPage_h
#define staticPage_h
#include <Arduino.h>
#define PATIENT_COUNT 9
#define MEASURMENT_COUNT 8

String makePatient(String patient[]);
String makePage(String patient[PATIENT_COUNT][MEASURMENT_COUNT]);

#endif