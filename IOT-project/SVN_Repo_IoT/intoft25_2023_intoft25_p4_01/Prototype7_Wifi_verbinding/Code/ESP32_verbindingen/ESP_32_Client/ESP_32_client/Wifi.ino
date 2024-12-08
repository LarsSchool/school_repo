#include <WiFi.h>
#include <HTTPClient.h>


const char* ssid = "E.L.H. Access Point";
const char* password = "joerilars";
WiFiClient client;
HTTPClient http;


void setupWifi() {
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (!getWifiConnection()) {
    if (getTimer(getWaiting())) {
      Serial.print(".");
      setTimer();
    }
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

bool getWifiConnection() {
  return WiFi.status() == WL_CONNECTED;
}

String httpGETRequest(const char* serverName) {
  // Your Domain name with URL path or IP address with path
  http.begin(client, serverName);
  // Send HTTP POST request
  String payload = "--";
  uint8_t responseCode = http.GET();
  printResponseCode(responseCode);
  if (responseCodeOk(responseCode)) {
    payload = http.getString();
  }
  // Free resources
  http.end();

  return payload;
}

void printResponseCode(uint8_t httpResponseCode) {
  if (responseCodeOk(httpResponseCode)) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
}

bool responseCodeOk(uint8_t httpResponseCode) {
  return httpResponseCode > 0;
}

