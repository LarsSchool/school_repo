#ifndef Wifi_h
#define Wifi_h
#include <Arduino.h>
#include "WiFi.h"
#include <HTTPClient.h>
#include "Timer.h"
#define SSID "E.L.H. Access Point"
#define PASSWORD "joerilars"

void setupWifi();
bool getWifiConnection();
String httpGETRequest(const char* serverName);
void printResponseCode(uint8_t httpResponseCode);
bool responseCodeOk(uint8_t httpResponseCode);
#endif
