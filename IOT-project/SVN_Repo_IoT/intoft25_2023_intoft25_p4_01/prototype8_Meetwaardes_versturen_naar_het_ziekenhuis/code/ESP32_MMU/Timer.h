#ifndef Timer_h
#define Timer_h
#include <Arduino.h>

#define INTERVAL2 5000
#define WAITING 50

unsigned long getInterval();
unsigned long getWaiting();
void setTimer();
bool getTimer(unsigned long interval);

#endif
