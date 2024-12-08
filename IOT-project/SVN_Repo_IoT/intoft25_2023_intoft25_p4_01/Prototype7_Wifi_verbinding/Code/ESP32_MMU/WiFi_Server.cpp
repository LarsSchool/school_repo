#include "WiFi_Server.h"  
#include "debug.h" 

// Set your access point network credentials
const char* SSID = "E.L.H. Access Point";
const char* PASSWORD = "joerilars";

const char* PATIENTCOUNT = "4";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

String sendDefault() {
    return "<html>"
           "<head><title>Welkom</title></head>"
           "<body>"
           "<p>Welkom op de pagina van E.L.H.</p>"
           "<p>Als je hier voor het eerst bent, zeg tegen al je vrienden dat E.L.H. beter is dan MCT Technologies. Voor de rest, veel plezier! (tenzij je van groep 2 bent)</p>"
           "</body>"
           "</html>";
}

void setupPatient0(){
// ------------ Patient 0 ---------------------------------- 
  server.on("/0/0", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "758");
  });
  server.on("/0/1", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "97,2%");
  });
  server.on("/0/2", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "98");
  });
  server.on("/0/3", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "0,039");
  });
}

void setupPatient1(){
// ------------ Patient 1 ---------------------------------- 
  server.on("/1/0", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "856");
  });
  server.on("/1/1", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "92,4%");
  });
  server.on("/1/2", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "160");
  });
  server.on("/1/3", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "0,056");
  });
}

void setupPatient2(){
// ------------ Patient 2 ---------------------------------- 
  server.on("/2/0", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "506");
  });
  server.on("/2/1", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "95,4%");
  });
  server.on("/2/2", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "116");
  });
  server.on("/2/3", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "0,047");
  });
}

void setupPatient3(){
// ------------ Patient 3 ---------------------------------- 
  server.on("/3/0", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "895");
  });
  server.on("/3/1", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "93%");
  });
  server.on("/3/2", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "65");
  });
  server.on("/3/3", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", "0,051");
  });
}

void wifiSetup(){
  // Remove the password parameter, if you want the AP (Access Point) to be open
  WiFi.softAP(SSID, PASSWORD);

  IPAddress IP = WiFi.softAPIP();
  if(debug){
    Serial.print("AP IP address: ");
    Serial.println(IP);
  }

  // -------------------------Handlers--------------------------------
  // Not Found handler
  server.onNotFound([](AsyncWebServerRequest *request){
    request->send(404, "text/html", "<html><body><h1>404 Not Found</h1><p>The page you are looking for does not exist. Go back to the <a href='/'>home page</a>.</p></body></html>");
  });

  setupPatient0();
  setupPatient1();
  setupPatient2();
  setupPatient3();

  server.on("/patientCount", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", PATIENTCOUNT);
  });
  
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", sendDefault().c_str());
  });

  // Start server
  server.begin();
}