#include <Arduino.h>

// Create integer with constant value
const int ledPin = 2;

void setupFunction() {
  // initialize digital pin ledPin  as an output.
  pinMode(ledPin, OUTPUT);
}

// the loop function runs over and over again forever
void loopFunction() {
  digitalWrite(ledPin, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(ledPin, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}