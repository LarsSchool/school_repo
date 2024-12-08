#include <Ethernet.h>

extern "C" {
#include "cserver.h"
}

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192, 168, 1, 21);
EthernetServer server(80);
EthernetClient httpClient;

// make httpClient methods available as ordinary functions
int clientAvailable() {
  return httpClient.connected() && httpClient.available();
}
char clientRead() { return httpClient.read(); }
char clientPeek() { return httpClient.peek(); }

// allow to log msg in C code to print on serial monitor
void serialLog(const char* msg) { Serial.print(msg); }

void setup() {
  Serial.begin(9600);

  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());

  // in comment to prevent logging
  initLogger(serialLog);
}

void loop() {
  httpClient = server.available();
  if (httpClient) {
    Serial.println("new client");

    struct stream stream = {clientAvailable, clientPeek,
                            clientRead};
    struct response response = handleRequest(stream);
    switch (response.code) {
    case OK_ID:
      httpClient.println(F("HTTP/1.1 200 OK"));
      httpClient.println(F("Content-Length: 3"));
      httpClient.println();
      httpClient.print(response.id);
      // Serial.println(response.id);
      break;
    case OK_DATA:

      break;
    case NOT_FOUND:
      httpClient.println(F("HTTP/1.1 404 NOT FOUND"));
      httpClient.println(F("Connection: close"));
      httpClient.println();
      break;
    case BAD_REQUEST:
      httpClient.println(F("HTTP/1.1 400 BAD REQUEST"));
      httpClient.println(F("Connection: close"));
      httpClient.println();
      break;
    default:
      break;
    }

    Serial.print("response code: ");
    Serial.println(response.code);

    delay(1);
    httpClient.stop(); // close connection
    Serial.println("client disconnected");
  }
}
