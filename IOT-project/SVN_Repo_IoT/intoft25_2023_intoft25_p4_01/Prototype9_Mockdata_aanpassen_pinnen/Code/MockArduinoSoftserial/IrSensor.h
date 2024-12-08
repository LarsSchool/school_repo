#ifndef IRSENSOR_H
#define IRSENSOR_H

#include <Arduino.h>  

const byte analogSensorSize = 2;

void setupIrSensor();
int getAfstand(unsigned short id);

#endif
