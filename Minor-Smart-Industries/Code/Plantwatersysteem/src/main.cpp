#include <Arduino.h>
#include <vector>

// See the actual loop and setup at the bottom of the page.

// Software timer(s) code
// ------------------------------------------------------------------------------------------------------------
enum Components { LDRSensor, Moist, WaterPump, DHTSensor, KaKu };

uint8_t numberOfComponents = 5;
uint64_t currentTimeMillis = millis();

std::vector<uint64_t> timers(numberOfComponents, 0);

void softwareTimerSetup() {
  timers[LDRSensor] = currentTimeMillis;
  timers[Moist] = currentTimeMillis;
  timers[WaterPump] = currentTimeMillis;
  timers[DHTSensor] = currentTimeMillis;
  timers[KaKu] = currentTimeMillis;
}


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
  if (currentTimeMillis - timers[KaKu] > 1000) {
    switchKaku(rfPin, TRANSMITTERID1, 1, 1, true, 3);
  }
  if (currentTimeMillis - timers[KaKu] > 2000) {
    switchKaku(rfPin, TRANSMITTERID1, 1, 1, false, 3);
    timers[KaKu] = currentTimeMillis;
  }
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
  if (currentTimeMillis - timers[DHTSensor] > 1000) {

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

    timers[DHTSensor] = currentTimeMillis;
  }
}

// Water pump/ relay code
// ------------------------------------------------------------------------------------------------------------
uint8_t waterPumpPin = 33;

void setupWaterPump() { pinMode(waterPumpPin, OUTPUT); }

void loopWaterPump() {
  if (currentTimeMillis - timers[WaterPump] > 1000) {
    Serial.println("Pump is now on");
    digitalWrite(waterPumpPin, HIGH);
  }

  if (currentTimeMillis - timers[WaterPump] > 2000) {
    Serial.println("Pump is now off");
    digitalWrite(waterPumpPin, LOW);

    timers[WaterPump] = currentTimeMillis;
  }
}

// Moist sensor code
// --------------------------------------------------------------------------------------------------------

// Set pin number
uint8_t moistSensPin = 36;
uint32_t moistValue = 0;

void setupMoist() {}

void loopMoist() {
  if (currentTimeMillis - timers[Moist] > 1000) {
    moistValue = analogRead(moistSensPin);
    Serial.print("Moisture Value = ");
    Serial.println(moistValue);

    timers[Moist] = currentTimeMillis;
  }
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
  if (currentTimeMillis - timers[LDRSensor] > 100) {
    lightValue = analogRead(ldrPin);
    Serial.println(lightValue);
    if (lightInitial - lightValue >= 200) {
      digitalWrite(ledPin, HIGH);
    }

    else {
      digitalWrite(ledPin, LOW);
    }
    timers[LDRSensor] = currentTimeMillis;
  }
}

// Standaard Arduino code om het aan te roepen
void setup() {
  Serial.begin(9600);
  Serial.println("Started the setup sequence.");
  softwareTimerSetup();
  setupLDR();
  setupMoist();
  setupWaterPump();
  setupDHT();
  setupKaKu();
  Serial.println("Started the loop sequence.");
}

void loop() {
  loopLDR();
  loopMoist();
  loopWaterPump();
  loopDHT();
  loopKaKu();
  currentTimeMillis = millis();
}





