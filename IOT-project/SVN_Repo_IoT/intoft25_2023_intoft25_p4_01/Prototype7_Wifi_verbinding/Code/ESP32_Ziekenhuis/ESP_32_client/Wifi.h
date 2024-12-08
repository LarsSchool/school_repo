#ifndef Wifi_h
#define Wifi_h
#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include "Timer.h"

void setupWifi();
bool getWifiConnection();
String httpGETRequest(const char* serverName);
void printResponseCode(uint8_t httpResponseCode);
bool responseCodeOk(uint8_t httpResponseCode);

#endif
