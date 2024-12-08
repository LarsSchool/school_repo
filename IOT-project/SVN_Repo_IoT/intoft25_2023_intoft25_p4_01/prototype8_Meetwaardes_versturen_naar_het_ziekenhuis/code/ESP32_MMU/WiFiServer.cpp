#include "WiFiServer.h"
#include "debug.h"
#include "Timer.h"

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
String newestMeasurement;
String currentDestination = "/measurement";

void wifiSetup() {

  WiFi.softAP(SSID, PASSWORD);

  IPAddress IP = WiFi.softAPIP();
  if (debug) {
    Serial.print("AP IP address: ");
    Serial.println(IP);
  }

  // Not Found handler
  server.onNotFound([](AsyncWebServerRequest *request) {
    request->send(404, "text/html", "<html><body><h1>404 Not Found</h1><p>The page you are looking for does not exist. Go back to the <a href='/'>home page</a>.</p></body></html>");
  });

  server.on("/patientCount", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", PATIENTCOUNT);
  });

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", sendDefault().c_str());
  });

  // Start server
  server.begin();
}

void sendData(String patientId, String measurementId, String measurement) {
  String newDestination = "/" + patientId + "/" + measurementId;
  Serial.println(newDestination);

  newestMeasurement = measurement;
  Serial.println(newestMeasurement);

  server.on(newDestination.c_str(), HTTP_GET, [measurement](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", measurement.c_str());
  });

  server.on(currentDestination.c_str(), [newDestination](AsyncWebServerRequest *request) {
    request->redirect(newDestination.c_str());
  });

  currentDestination = newDestination;
}

String sendDefault() {
  return "<html>"
         "<head><title>Welkom</title></head>"
         "<body>"
         "<p>Welkom op de pagina van E.L.H.</p>"
         "<p>Als je hier voor het eerst bent, zeg tegen al je vrienden dat E.L.H. beter is dan MCT Technologies. Voor de rest, veel plezier! (tenzij je van groep 2 bent)</p>"
         "</body>"
         "</html>";
}
