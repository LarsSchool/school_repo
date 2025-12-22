#include "Moist_sensor.h"
#include <Arduino.h>

uint8_t moistSensPin = 36;
uint32_t moistValue = 0;

void setupMoist() {
  // nothing for now
}

void loopMoist() {
  if (currentTimeMillis - timers[Moist] > 1000) {
    moistValue = analogRead(moistSensPin);
    Serial.print("Moisture Value = ");
    Serial.println(moistValue);

    timers[Moist] = currentTimeMillis;
  }
}