/*
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-client-server-wi-fi/
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/

#include "Wifi.h"

const char* SSID = "E.L.H. Access Point";
const char* PASSWORD = "joerilars";
WiFiClient client;
HTTPClient http;

void setupWifi() {
  WiFi.begin(SSID, PASSWORD);
  Serial.println("Connecting");
  while (!getWifiConnection()) {
    if (getTimer(getWaiting())) {
      Serial.print(".");
      setTimer();
    }
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

bool getWifiConnection() {
  return WiFi.status() == WL_CONNECTED;
}

String httpGETRequest(const char* serverName) {
  // Your Domain name with URL path or IP address with path
  http.begin(client, serverName);
  // Send HTTP POST request
  String payload = "--";
  uint8_t responseCode = http.GET();
  printResponseCode(responseCode);
  if (responseCodeOk(responseCode)) {
    payload = http.getString();
  }
  // Free resources
  http.end();

  return payload;
}

void printResponseCode(uint8_t httpResponseCode) {
  if (responseCodeOk(httpResponseCode)) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
}

bool responseCodeOk(uint8_t httpResponseCode) {
  return httpResponseCode > 0;
}
