#include <Arduino.h>
// #include "Plotter.h"

int buttonstate = 0;
// double x;

// Plotter p;

void setup() {
  pinMode(13, INPUT);
  Serial.begin(9600);
  // p.Begin();
  // p.AddTimeGraph( "Some title", 1500, "label for x", x );
}

void loop() {
  // x = 10*sin( 2.0*PI*( millis() / 5000.0 ) );
  buttonstate = analogRead(A0);
  Serial.println(buttonstate);
  // p.Plot(); // usually called within loop()
}

