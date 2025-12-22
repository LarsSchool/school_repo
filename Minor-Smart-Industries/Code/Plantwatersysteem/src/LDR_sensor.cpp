#include "LDR_sensor.h"
#include <Arduino.h>

const int ldrPin = 39;
const int ledPin = 2;

int lightInitial = 0;
int lightValue = 0;

void setupLDR() {
  pinMode(ldrPin, INPUT);
  pinMode(ledPin, OUTPUT);
  if (getDebugMode()) {
    Serial.println("LDR setup test");
  }
  lightInitial = analogRead(ldrPin);
}

void loopLDR() {
  if (currentTimeMillis - timers[LDRSensor] > 100) {
    lightValue = analogRead(ldrPin);
    if (getDebugMode()) {
      Serial.print("lightvalue: ");
      Serial.println(lightValue);
    }
    if (lightInitial - lightValue >= 200) {
      digitalWrite(ledPin, HIGH);
    } else {
      digitalWrite(ledPin, LOW);
    }
    timers[LDRSensor] = currentTimeMillis;
  }
}