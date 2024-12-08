#ifndef WIFI_SERVER_h
#define WIFI_SERVER_h

#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include "staticPage.h"
#include <Arduino.h>
// Set your access point network credentials
#define SSID2 "E.L.H. Access Point Ziekenhuis"
#define PASSWORD2 "owenpatrick"
void serverSetup();
void sendPage(String page);
#endif