#ifndef TIMER_H
#define TIMER_H

#include <stdint.h>
#include <Arduino.h>

const uint8_t timeSize = 2;
void setupTimer();
void setTimer(unsigned short id);
float getTimer(unsigned short id);

#endif
