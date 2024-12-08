#include <SoftwareSerial.h>

#define rxPin 10
#define txPin 11
#define potentioPin A0


SoftwareSerial heartBeat =  SoftwareSerial(rxPin, txPin);

void SoftSerialSetup()
{
  pinMode(txPin, OUTPUT);
  pinMode(rxPin, INPUT);
  heartBeat.begin(115200);
  Serial.begin(115200);
}

void printHeartBeat()
{
  unsigned short value = map(analogRead(potentioPin), 1, 1023, 50, 220);
  heartBeat.write(value);
//  Serial.println(value);
}
