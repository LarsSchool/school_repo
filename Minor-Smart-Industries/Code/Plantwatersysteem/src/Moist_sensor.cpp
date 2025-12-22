#include "Moist_sensor.h"
#include <Arduino.h>

uint8_t moistSensPin = 36;
uint32_t moistValue = 0;

void setupMoist() {
  // Empty for now, but is here for possible future improvements and to have a
  // setup and loop of all components.
}

void loopMoist() {
  if (currentTimeMillis - timers[Moist] > 1000) {
    moistValue = analogRead(moistSensPin);

    if (getDebugMode()) {
      Serial.print("Moisture Value = ");
      Serial.println(moistValue);
    }

    timers[Moist] = currentTimeMillis;
  }
}