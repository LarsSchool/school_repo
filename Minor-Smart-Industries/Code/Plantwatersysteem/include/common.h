#ifndef COMMON_H
#define COMMON_H

#include <Arduino.h>
#include <vector>

enum Components {
  LDRSensor,
  Moist,
  WaterPump,
  DHTSensor,
  KaKu,
  WiFiComponent,
  OLEDDisplay
};

extern uint8_t numberOfComponents;
extern uint64_t currentTimeMillis;
extern std::vector<uint64_t> timers;

void softwareTimerSetup();

#endif // COMMON_H