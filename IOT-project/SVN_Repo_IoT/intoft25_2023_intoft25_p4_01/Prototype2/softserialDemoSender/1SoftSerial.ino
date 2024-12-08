#include <SoftwareSerial.h>

#define rxPin 2
#define txPin 3

SoftwareSerial SoftSerial =  SoftwareSerial(rxPin, txPin);

int dataMock[] = { 0, 1, 2, 3, 4, 5, 6, 7 , 8, 9 , 10};
int count = 0;

unsigned long previousMillis = 0;

void SoftSerialSetup()
{
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  SoftSerial.begin(9600);
}

void sendData()
{
 unsigned long currentMillis =  millis();
 if(currentMillis - previousMillis > 5)
 {
    SoftSerial.write("k");
    SoftSerial.write(250);
    previousMillis = currentMillis;
 }
}
