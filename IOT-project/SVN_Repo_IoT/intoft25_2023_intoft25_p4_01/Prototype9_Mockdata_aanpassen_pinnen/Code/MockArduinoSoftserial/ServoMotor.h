#ifndef SERVOMOTOR_H
#define SERVOMOTOR_H

#include <stdint.h>

const uint8_t servoSensorSize = 2;

void setupServoMotor();
void draaiMotor(unsigned short id, float draai);

#endif
