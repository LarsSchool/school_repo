#include <Arduino.h>

void setup() {
  DDRD = B111111;
}

void loop() {
  PORTD = B111111;
  PORTD = B000000;
  PORTD = B111111;
  PORTD = B000000;
  PORTD = B111111;
  PORTD = B000000;
  PORTD = B111111;
  PORTD = B000000;
  PORTD = B111111;
  PORTD = B000000;
  PORTD = B111111;
  PORTD = B000000;
  PORTD = B111111;

}