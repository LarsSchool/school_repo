#include "Timer.h"
unsigned long previousMillis2;

unsigned long getInterval() {
  return INTERVAL2;
}

unsigned long getWaiting() {
  return WAITING;
}

void setTimer() {
  previousMillis2 = millis();
}

bool getTimer(unsigned long interval) {
  return millis() - previousMillis2 >= interval;
}
