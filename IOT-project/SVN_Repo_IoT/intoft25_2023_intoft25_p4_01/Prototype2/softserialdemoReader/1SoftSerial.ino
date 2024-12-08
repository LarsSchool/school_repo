#include <SoftwareSerial.h>

#define rxPin 2
#define txPin 3

int count75 = 0;
int count250 = 0;

SoftwareSerial SoftSerial =  SoftwareSerial(rxPin, txPin);

unsigned long previousMillis = 0;


void SoftSerialSetup()
{
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  SoftSerial.begin(9600);
}

void readSoftSerial()
{
    if (SoftSerial.available() > 0) {
        Serial.println(SoftSerial.read());
    }
}
