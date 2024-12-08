#ifndef WIFISERVER_h
#define WIFISERVER_h

#include <Arduino.h>

// Set your access point network credentials
#define SSID_MMU "E.L.H. Access Point"
#define PASSWORD "joerilars"

#define PATIENTCOUNT "4"

void wifiSetup();
void sendData(String patientId, String measurementId, String measurement);
String sendDefault();
void checkHeap();

#endif
