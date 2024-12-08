#include "Timer.h"
unsigned long previousMillis;

unsigned long getInterval() {
  return INTERVAL;
}

unsigned long getWaiting() {
  return WAITING;
}

void setTimer() {
  previousMillis = millis();
}

bool getTimer(unsigned long interval) {
  return millis() - previousMillis >= interval;
}
