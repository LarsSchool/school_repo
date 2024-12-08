/*
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-client-server-wi-fi/
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/

void setup() {
  Serial.begin(115200);
  setupWifi();
}

void loop() {

  if (getTimer(getINTERVAL())) {
    // Check WiFi connection status
    if (getWifiConnection()) {
      getAllPatient(CountPatient());
      setTimer();
    } else {
      Serial.println("WiFi Disconnected");
    }
  }
}


