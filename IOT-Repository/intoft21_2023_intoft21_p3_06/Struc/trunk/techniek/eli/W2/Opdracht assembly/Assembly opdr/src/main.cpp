#include <Arduino.h>

void setup() {
  DDRD = B1;
}

void loop() {
  PORTD = B0; 
  delay(200);
  PORTD = B1;
  delay(200);
  digitalWrite
}
