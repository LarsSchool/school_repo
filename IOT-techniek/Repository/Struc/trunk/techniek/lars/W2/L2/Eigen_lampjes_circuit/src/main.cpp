#include <Arduino.h>

int Rood1 = 13;
int Rood2 = 12;
int Geel1 = 11;
int Geel2 = 10;
int Groen1 = 9;
int Groen2 = 8;
int Blauw1 = 7;
int Blauw2 = 6;
int Wit1 = 5;
int Wit2 = 4;

int lampjes[] = {Rood1, Rood2, Geel1, Geel2, Groen1, Groen2, Blauw1, Blauw2, Wit1, Wit2};

int PotMeter = A0;

int potValue;
int berekendeWaarde;

void resetLampjes(){
  digitalWrite(Rood1, LOW);
  digitalWrite(Rood2, LOW);
  digitalWrite(Geel1, LOW);
  digitalWrite(Geel2, LOW);
  digitalWrite(Groen1, LOW);
  digitalWrite(Groen2, LOW);
  digitalWrite(Blauw1, LOW);
  digitalWrite(Blauw2, LOW);
  digitalWrite(Wit1, LOW);
  digitalWrite(Wit2, LOW);
}

void setup() {
  pinMode(Rood1, OUTPUT);
  pinMode(Rood2, OUTPUT);
  pinMode(Geel1, OUTPUT);
  pinMode(Geel2, OUTPUT);
  pinMode(Groen1, OUTPUT);
  pinMode(Groen2, OUTPUT);
  pinMode(Blauw1, OUTPUT);
  pinMode(Blauw2, OUTPUT);
  pinMode(Wit1, OUTPUT);
  pinMode(Wit2, OUTPUT);
}

void loop() {
  potValue = analogRead(PotMeter);
  berekendeWaarde = floor(potValue / 1000);
  resetLampjes();
  for(int i = 0; i < berekendeWaarde; i++){
    digitalWrite(lampjes[i], HIGH);
  }
}
