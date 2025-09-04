#include <Arduino.h>

// See the actual loop and setup at the bottom of the page.

// KaKu switch code
// ------------------------------------------------------------------------------------------------------------

// #include "switchKaKu.h"
// #define TRANSMITTERID1 202504
// #define rfPin 25

// void setup() {

// }

// void loop() {
//   switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
//   delay(500);
// }

#include "switchKaKu.h"
#define TRANSMITTERID1 202504 //
// Program transmitterID like this:
// https://www.robotexchange.io/t/appendix-programming-the-klikaanklikuit/862
#define rfPin 25

void setupKaKu() {
  for (uint8_t i = 0; i < 3; i++) {
    switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
    delay(500);
  }
}

void loopKaKu() {
  switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
  delay(1000);
  switchKaku(rfPin, TRANSMITTERID1, 1, 1, false, 3);
  delay(1000);
}

// DHT sensor code
// ------------------------------------------------------------------------------------------------------------

#include "DHT.h"

#define DHTPIN 32
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setupDHT() {
  Serial.println(F("DHT11 test!"));
  dht.begin();
}

void loopDHT() {
  delay(1000);

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.println(F("°C "));
}

// Water pump/ relay code
// ------------------------------------------------------------------------------------------------------------
int pumpPin = 33;

void setupWaterPump() { pinMode(pumpPin, OUTPUT); }

void loopWaterPump() {

  Serial.println("Pump is now on");
  digitalWrite(pumpPin, HIGH);
  delay(1000);

  Serial.println("Pump is now off");
  digitalWrite(pumpPin, LOW);
  delay(1000);
}

// Moist sensor code
// --------------------------------------------------------------------------------------------------------

// Set pin number
uint8_t moistSensPin = 36;
uint32_t moistValue = 0;

void setupMoist() {}

void loopMoist() {
  moistValue = analogRead(moistSensPin);
  Serial.print("Moisture Value = ");
  Serial.println(moistValue);
  delay(1000);
}

// LDR code
// -----------------------------------------------------------------------------------------------------------

const int ldrPin = 39;
const int ledPin = 2;

int lightInitial;
int lightValue;

void setupLDR() {
  pinMode(ldrPin, INPUT);
  pinMode(ledPin, OUTPUT);
  lightInitial = analogRead(ldrPin);
}

void loopLDR() {
  lightValue = analogRead(ldrPin);
  Serial.println(lightValue);
  if (lightInitial - lightValue >= 200) {
    digitalWrite(ledPin, HIGH);
  }

  else {
    digitalWrite(ledPin, LOW);
  }
}

// Standaard Arduino code

void setup() {
  Serial.begin(9600);
  Serial.println("Started the setup sequence.");
  setupLDR();
  setupMoist();
  setupWaterPump();
  setupDHT();
  setupKaKu();
  Serial.println("Started the loop sequence.");
}

void loop() {
  // loopLDR();
  // loopMoist();
  // loopWaterPump();
  // loopDHT();
  loopKaKu();
}