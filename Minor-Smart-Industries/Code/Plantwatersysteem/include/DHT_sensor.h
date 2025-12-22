#ifndef DHT_SENSOR_H
#define DHT_SENSOR_H

#include "common.h"

void setupDHT();
void loopDHT();

float getHumidity();
float getTemperature();

#endif // DHT_SENSOR_H