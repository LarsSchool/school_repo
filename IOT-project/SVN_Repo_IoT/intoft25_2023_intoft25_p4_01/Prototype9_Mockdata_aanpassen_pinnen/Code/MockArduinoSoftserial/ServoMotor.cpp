#include "ServoMotor.h"
#include <Servo.h>
Servo myservo[2];

unsigned short servoSensorPins[servoSensorSize]  = {9, 10};

void setupServoMotor() 
{
  for(int i = 0 ; i < servoSensorSize ; i++)
  {
     myservo[i].attach(servoSensorPins[i]);
     myservo[i].write(190);
  }
}

void draaiMotor(unsigned short id, float draai) {
    myservo[id].write(draai);
}
