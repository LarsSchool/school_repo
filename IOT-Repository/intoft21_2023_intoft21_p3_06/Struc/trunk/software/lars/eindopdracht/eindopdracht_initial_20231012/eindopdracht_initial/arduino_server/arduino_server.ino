#include <Ethernet.h>

extern "C" {
#include "cserver.h"
}

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192, 168, 1, 21);
EthernetServer server(80);
const uint8_t SENSOR1 = A1;
const uint8_t SENSOR2 = A2;
const uint8_t ROOD1 = 6;
const uint8_t ROOD2 = 5;
const uint8_t GEEL = 4;
const uint8_t GROEN = 3;
const uint8_t LEDS[] = {ROOD1, ROOD2, GEEL, GROEN};
EthernetClient httpClient;

// make httpClient methods available as ordinary functions
int clientAvailable() {
  return httpClient.connected() && httpClient.available();
}
char clientRead() { return httpClient.read(); }
char clientPeek() { return httpClient.peek(); }

void setup() {
  Ethernet.begin(mac, ip);
  server.begin();
  // setup LEDS
  for (int i = 0; i < 4; i++) {
    pinMode(LEDS[i], OUTPUT);
  }
  pinMode(SENSOR1, INPUT);
  pinMode(SENSOR2, INPUT);
  // Serial is uitgecomment om 300 bytes aan flash te
  // besparen, mocht dit nodig zijn kan je het weer weghalen
  // en dan werkt serial weer.
  // Serial.begin(9600);
  // Serial.print("server is at ");
  // Serial.println(Ethernet.localIP());
}

void loop() {
  Serial.println(analogRead(A3));
  for (int i = 0; i < 4; i++) {
    digitalWrite(LEDS[i], HIGH);
  }
  for (int i = 0; i < 4; i++) {
    digitalWrite(LEDS[i], LOW);
  }
  httpClient = server.available();
  if (httpClient) {
    Serial.println("new client");

    struct stream stream = {clientAvailable, clientPeek,
                            clientRead};
    struct response response = handleRequest(stream);
    switch (response.code) {
    case BAD_REQUEST_400:
      httpClient.println(F("HTTP/1.1 400 BAD_REQUEST"));
      httpClient.println(F("Connection: close"));
      httpClient.println("");
      break;
    case NOT_FOUND_404:
      httpClient.println(F("HTTP/1.1 404 NOT FOUND"));
      httpClient.println(F("Connection: close"));
      httpClient.println("");
      break;
    case INTERNAL_SERVER_ERROR_500:
      httpClient.println(
          F("HTTP/1.1 500 Internal Server Error"));
      httpClient.println("");
      break;

      // GETs: Er wordt niet gecontroleerd op content-length
      // en dus om de response zo klein mogelijk te houden
      // heb ik gekozen om dit erbuiten te laten.
    case OK_200_GET_AVG:
      httpClient.println(F("HTTP/1.1 200 OK"));
      httpClient.println("");
      httpClient.println(response.get_avg);
      httpClient.println("");
      break;
    case OK_200_GET_STDEV:
      httpClient.println(F("HTTP/1.1 200 OK"));
      httpClient.println("");
      httpClient.println(response.get_stdev);
      httpClient.println("");
      break;
    case OK_200_GET_ACTUAL:
      httpClient.println(F("HTTP/1.1 200 OK"));
      httpClient.println("");
      httpClient.println(response.get_actual);
      httpClient.println("");
      break;
    case CREATED_201_PUT_MODE_PASSIVE:
    case CREATED_201_PUT_MODE_ACTIVE:
    case CREATED_201_DELETE_MEASUREMENTS:
    case CREATED_201_PUT_CBUFFSIZE:
    case CREATED_201_POST_MEASUREMENT:
      httpClient.println(F("HTTP/1.1 201 CREATED"));
      httpClient.println("");
      break;
    default:
      httpClient.println(F("HTTP/1.1 400 BAD REQUEST"));
      httpClient.println(F("Connection: close"));
      httpClient.println("");
      break;
    }

    // Serial.print("response code: ");
    // Serial.println(response.code);
    delay(1);
    httpClient.stop(); // close connection
    // Serial.println("client disconnected");
  }
}