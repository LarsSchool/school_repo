#ifndef Timer_h
#define Timer_h
#include <Arduino.h>

#define INTERVAL 100
#define WAITING 500

unsigned long getInterval();
unsigned long getWaiting();
void setTimer();
bool getTimer(unsigned long interval);

#endif