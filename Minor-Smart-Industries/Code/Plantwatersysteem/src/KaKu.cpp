#include "KaKu.h"
#include "switchKaKu.h"
#include <Arduino.h>

#define TRANSMITTERID1 202504
#define rfPin 25

bool kakuStateOn = false;

void setupKaKu() {
  for (uint8_t i = 0; i < 3; i++) {
    switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
    delay(500);
  }
}

void loopKaKu() {
  if (currentTimeMillis - timers[KaKu] > 1000 && !kakuStateOn) {
    switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
    kakuStateOn = true;
    // timers[KaKu] = currentTimeMillis;
    // if (getDebugMode()) {
    //   Serial.println("KaKu switch ON");
    // }
  } else if (currentTimeMillis - timers[KaKu] > 1000 && kakuStateOn) {
    switchKaku(rfPin, TRANSMITTERID1, 1, 1, false, 3);
    kakuStateOn = false;
    timers[KaKu] = currentTimeMillis;
    // if (getDebugMode()) {
    //   Serial.println("KaKu switch OFF");
    // }
  }
}