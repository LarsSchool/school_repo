#include "Wifi.h"
#include "Patient.h"
#include "Timer.h"
#include "WiFi_Server.h"
#include "staticPage.h"

void setup() {
  Serial.begin(115200);
  fillArray();
  serverSetup();
  setupWifi();
}

void loop() {

  if (getTimer(getInterval())) {
    // Check WiFi connection status
    if (getWifiConnection()) {
      sendPage(makePageWithPatientAllData());
      setTimer();
    } else {
      Serial.println("WiFi Disconnected");
      setupWifi();
    }
  }
  if (getWifiConnection()) {
    getAllPatient();
  }
}
