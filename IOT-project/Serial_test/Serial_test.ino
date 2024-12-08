#include <SoftwareSerial.h>

#define rxPin 6
#define txPin 7

SoftwareSerial heartBeat =  SoftwareSerial(rxPin, txPin);

void setup() {
  Serial.begin(115200);
  SoftSerialSetup();
}

void loop() {
  // put your main code here, to run repeatedly:
  readHeartBeat();
}
void SoftSerialSetup()
{
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  heartBeat.begin(115200);
}

void readHeartBeat()
{
    if (heartBeat.available() > 0) {
      byte value = heartBeat.read();
      if(value != 0){
        Serial.println(value);
      }
    }
}
