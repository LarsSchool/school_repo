#include <Servo.h>
Servo myservo;

void setupServoMotor() {
  myservo.attach(9);
  myservo.write(90);
}

void draaiMotor(float draai) {
    myservo.write(draai);
}