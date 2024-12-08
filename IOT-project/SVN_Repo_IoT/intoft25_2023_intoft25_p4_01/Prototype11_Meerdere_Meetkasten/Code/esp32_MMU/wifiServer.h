#ifndef WIFISERVER_h
#define WIFISERVER_h

#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <Arduino.h>
// Set your access point network credentials
#define SSID "E.L.H. Access Point"
#define PASSWORD "joerilars"

#define PATIENTCOUNT "4"

void wifiSetup();

// We weten dat dit niet de mooiste code is, maar dit is alleen om het te testen.
void setupPatient0();
void setupPatient1();
void setupPatient2();
void setupPatient3();

void sendData(String patientId, String meetwaardeId, String meetwaarde);
#endif
