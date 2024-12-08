/*
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-client-server-wi-fi/
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  Zoals hierboven staat is deze code gebaseerd op de code van meneer Santos.
*/

// Import required libraries
#include "WiFi.h"
#include "ESPAsyncWebServer.h"

//#include <Wire.h>


// Set your access point network credentials
const char* ssid = "E.L.H. Access Point";
const char* password = "joerilars";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

String readTemp() {
  return "Temperatuur is veel te heet, want jij bent er.";
}

String readTime() {
  return "Tijd voor tafelPong!";
}

String readPres() {
  return "De druk is te hoog.";
}

String sendDefault() {
    return "<html>"
           "<head><title>Welkom</title></head>"
           "<body>"
           "<p>Welkom op de pagina van E.L.H.</p>"
           "<p>Als je hier voor het eerst bent, zeg tegen al je vrienden dat E.L.H. beter is dan MCT Technologies. Voor de rest, veel plezier! (tenzij je van groep 2 bent)</p>"
           "<p>Een paar mogelijkheden voor websites zijn bijvoorbeeld:</p>"
           "<ul>"
           "<li><a href='/temperature'>Temperatuur</a></li>"
           "<li><a href='/time'>Tijd</a></li>"
           "<li><a href='/pressure'>Druk</a></li>"
           "</ul>"
           "</body>"
           "</html>";
}

void setup(){
  // Serial port for debugging purposes
  Serial.begin(115200);
  Serial.println();
  
  // Setting the ESP as an access point
  Serial.print("Setting AP (Access Point)…");
  // Remove the password parameter, if you want the AP (Access Point) to be open
  WiFi.softAP(ssid, password);

  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", sendDefault().c_str());
  });

  server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", readTemp().c_str());
  });
  server.on("/time", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", readTime().c_str());
  });
  server.on("/pressure", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", readPres().c_str());
  });
    
  // Start server
  server.begin();
}
 
void loop(){
  
}
