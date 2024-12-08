#include "Wifi.h"
#include "getPatient.h"
#include "Timer.h"
#include "debug.h"


void setup() {
  serialBegin(115200);
  setupWifi();
}

void loop() {
  if (getTimer(getInterval())) {
    // Check WiFi connection status
    if (getWifiConnection()) {
      getAllPatient(countPatient());
      setTimer();
    } else {
      printString("WiFi Disconnected", true);
    }
  }
}
