#include <Servo.h>
Servo myservo;

void setupServoMotor() {
  myservo.attach(9);
  myservo.write(125);
}

void draaiMotor(float draai) {
    myservo.write(draai);
}
