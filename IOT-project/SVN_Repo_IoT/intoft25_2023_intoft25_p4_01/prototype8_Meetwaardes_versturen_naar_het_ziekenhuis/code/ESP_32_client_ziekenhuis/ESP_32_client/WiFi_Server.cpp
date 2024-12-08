#include "WiFi_Server.h"
#include "Patient.h"

AsyncWebServer server(80);
String HTMLPage;

void serverSetup() {
  WiFi.softAP(SSID2, PASSWORD2);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);

  server.on("/heap", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", String(ESP.getFreeHeap()));
  });

  sendPage(makePageWithPatientAllData());
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/html", HTMLPage);
  });

  // -------------------------Handlers--------------------------------
  // Not Found handler
  server.onNotFound([](AsyncWebServerRequest *request) {
    request->send(404, "text/html", "<html><body><h1>404 Not Found</h1><p>The page you are looking for does not exist. Go back to the <a href='/'>home page</a>.</p></body></html>");
  });

  // Start server
  server.begin();
}

void sendPage(String page) {
  HTMLPage = page;
}
