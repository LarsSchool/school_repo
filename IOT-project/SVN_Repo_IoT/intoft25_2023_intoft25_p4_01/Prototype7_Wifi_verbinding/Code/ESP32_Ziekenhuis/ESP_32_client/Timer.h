#ifndef Timer_h
#define Timer_h
#include <Arduino.h>

long getInterval();
long getWaiting();
void setTimer();
bool getTimer(unsigned long interval);

#endif