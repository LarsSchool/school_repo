#ifndef LDR_SENSOR_H
#define LDR_SENSOR_H

#include "common.h"

extern int lightInitial;
extern int lightValue;

void setupLDR();
void loopLDR();

#endif // LDR_SENSOR_H