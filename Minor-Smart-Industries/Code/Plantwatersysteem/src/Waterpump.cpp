#include "Waterpump.h"
#include <Arduino.h>

uint8_t waterPumpPin = 33;
bool pumpStateOn = false;

void setupWaterPump() { pinMode(waterPumpPin, OUTPUT); }

void loopWaterPump() {
  if (currentTimeMillis - timers[WaterPump] > 1000 && !pumpStateOn) {
    if (getDebugMode()) {
      Serial.println("Pump is now on");
    }
    digitalWrite(waterPumpPin, HIGH);
    pumpStateOn = true;
    timers[WaterPump] = currentTimeMillis;
  } else if (currentTimeMillis - timers[WaterPump] > 1000 && pumpStateOn) {
    if (getDebugMode()) {
      Serial.println("Pump is now off");
    }
    digitalWrite(waterPumpPin, LOW);
    pumpStateOn = false;
    timers[WaterPump] = currentTimeMillis;
  }
}