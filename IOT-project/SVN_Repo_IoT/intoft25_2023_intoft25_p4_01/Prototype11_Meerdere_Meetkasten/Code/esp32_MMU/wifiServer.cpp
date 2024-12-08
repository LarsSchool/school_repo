#include "wifiServer.h"
#include "debug.h"

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
String newestMeetwaarde;
String currentDestination;
String sendDefault() {
  return "<html>"
         "<head><title>Welkom</title></head>"
         "<body>"
         "<p>Welkom op de pagina van E.L.H.</p>"
         "<p>Als je hier voor het eerst bent, zeg tegen al je vrienden dat E.L.H. beter is dan MCT Technologies. Voor de rest, veel plezier! (tenzij je van groep 2 bent)</p>"
         "</body>"
         "</html>";
}

void setupPatient0() {
  // ------------ Patient 0 ----------------------------------
  server.on("/0/0", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", "758");
  });
  server.on("/0/1", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", "97,2%");
  });
  server.on("/0/2", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", "98");
  });
  server.on("/0/3", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", "0,039");
  });
}

void wifiSetup() {
  // Remove the password parameter, if you want the AP (Access Point) to be open
  WiFi.softAP(SSID, PASSWORD);

  IPAddress IP = WiFi.softAPIP();
  if (debug) {
    Serial.print("AP IP address: ");
    Serial.println(IP);
  }

  // -------------------------Handlers--------------------------------
  // Not Found handler
  server.onNotFound([](AsyncWebServerRequest *request) {
    request->send(404, "text/html", "<html><body><h1>404 Not Found</h1><p>The page you are looking for does not exist. Go back to the <a href='/'>home page</a>.</p></body></html>");
  });

  server.on("/patientCount", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", PATIENTCOUNT);
  });

  server.on("/meetwaarden", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", newestMeetwaarde);
  });
  currentDestination = "/meetwaarden";

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", sendDefault().c_str());
  });

  // Start server
  server.begin();
}

// void setupMeetwaarde(String patientId, String meetwaardeId, String meetwaarde) {

//   server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
//     request->send_P(200, "text/html", sendDefault().c_str());
//   });
// }

void sendData(String patientId, String meetwaardeId, String meetwaarde) {
  String newDestination = "/" + patientId + "/" + meetwaardeId;
  server.on(currentDestination.c_str(), [newDestination](AsyncWebServerRequest *request) {
    
    request->redirect(newDestination.c_str());
  });
  newestMeetwaarde = meetwaarde;
}
