#include "Timer.h"

unsigned long previousMillis = 0;
const long INTERVAL = 5000;
const long WAITING = 500;


long getInterval() {
  return INTERVAL;
}

long getWaiting() {
  return WAITING;
}

void setTimer() {
  previousMillis = millis();
}

bool getTimer(unsigned long interval) {
  return millis() - previousMillis >= interval;
}
