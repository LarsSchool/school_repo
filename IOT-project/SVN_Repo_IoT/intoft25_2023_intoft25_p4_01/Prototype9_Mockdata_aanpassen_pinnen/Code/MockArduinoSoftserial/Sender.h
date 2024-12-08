#ifndef SENDER_H
#define SENDER_H

#include <Arduino.h>
#include <stdint.h>
#include <stdbool.h>
#include "PID.h"

#define DIFFERENTPATIENTAMOUNT 2
#define DIFFERENTMACHINEAMOUNT 6
#define DIFFERENTARRAYDATA 3
#define TEMPGLOBALPIN 1
#define CHOLESTEROL 1
#define HEMOGLOBINE 2
#define BOVENDRUK 3
#define ONDERDRUK 4
#define HARTSLAG 5
#define PERCENTAGE 6

extern long dataArray[DIFFERENTMACHINEAMOUNT][DIFFERENTARRAYDATA];

extern uint8_t id2;
extern uint8_t machineId;

const uint8_t POTMETER = A0;

void dataSetup();
uint8_t mockHeartRate();
void sendPatientData(uint8_t patientId);
void addDataToPatientArray(uint8_t id, uint8_t patientId, uint8_t data, uint8_t pin);
uint8_t combineId(uint8_t machineId, uint8_t patientId);
void sendAllPatients();
void sendPercentage(uint8_t patientId);
void sendData(uint8_t id);
void readAndSendData(uint8_t machineId);

#endif // SENDER_H
