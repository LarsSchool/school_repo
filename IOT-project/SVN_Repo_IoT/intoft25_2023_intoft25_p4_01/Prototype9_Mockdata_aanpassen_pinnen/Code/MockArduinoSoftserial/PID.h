#ifndef PID_H
#define PID_H

#include <stdint.h>
#include <Arduino.h>

#define PID_SIZE 2

void updateAlleWipwaps();
void updateWaarde(unsigned short id, uint8_t SETPOINT, uint8_t Kp, float Ki, uint16_t Kd, uint8_t PERIODE);
float get_dist(unsigned short id, unsigned short n);

#endif
