#include <Servo.h>
Servo myservo1, myservo2;

void setupServoMotor() {
  myservo1.attach(9);
  myservo1.write(125);
  myservo2.attach(10);
  myservo2.write(125);
}

void draaiMotor1(float draai) {
    myservo1.write(draai);
}

void draaiMotor2(float draai) {
    myservo2.write(draai);
}
