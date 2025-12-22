#include "common.h"

uint8_t numberOfComponents = 7;
uint64_t currentTimeMillis = 0;
std::vector<uint64_t> timers(numberOfComponents, 0);

void softwareTimerSetup() {
  currentTimeMillis = millis();
  for (uint8_t i = 0; i < numberOfComponents; ++i) {
    timers[i] = currentTimeMillis;
  }
}