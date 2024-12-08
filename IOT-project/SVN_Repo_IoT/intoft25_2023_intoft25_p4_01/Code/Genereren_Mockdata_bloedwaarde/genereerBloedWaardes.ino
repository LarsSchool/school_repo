#include <SoftwareSerial.h>

void setup() {
  Serial.begin(9600);
}

void loop() {
  float cholesterol = random(1, 5);
  float hemoglobine = random(8.5, 11.0);
  float bovendruk = random(80, 120);
  float onderdruk = random(60, 90);

  Serial.print("Cholesterol:");
  Serial.println(cholesterol);
  Serial.print("Hemoglobine:");
  Serial.println(hemoglobine);
  Serial.print("Bovendruk:");
  Serial.println(bovendruk);
  Serial.print("Onderdruk:");
  Serial.println(onderdruk);

  delay(5000);
}
