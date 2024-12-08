// Made by Tan & Lars aka TaLa

#include <Servo.h>

Servo myservo;

unsigned long previousMillis = 0;
unsigned long currentMillis = 0;
unsigned short currentPos = 0;
unsigned short pos = 0;
unsigned long servoSpeed = 0;

unsigned long time;


void setup() {
  time = millis();
  Serial.begin(9600);
  myservo.attach(9);
  Serial.println("Command examples:\n speed 150\n spd 100\n s 50\n position 10\n pos 5\n p 2");
}

void loop() {
  if (Serial.available() > 0) {
    Serial.print("Command entered!\nVariable: ");
    String variable = Serial.readStringUntil(32);
    Serial.println(variable);
    Serial.print("Value: ");
    String value = Serial.readString();  // Blocking voor echt 200ms :/, kan nog verbeterd worden.
    Serial.println(value);
    handleCommand(variable, value);
    Serial.println("Done");
  }

  while (currentPos != pos) {
    moveServo();
  }

  if (currentPos == 0) {
    Serial.print("Execute time: ");
    Serial.println((millis() - time));
    pos = 180;
  } else if(currentPos == 180){
    pos = 0;
    time = millis();
  }
}

void handleCommand(String variable, String value) {
  variable.toLowerCase();
  value.toLowerCase();
  if (variable == "s" || variable == "spd" || variable == "speed") {
    Serial.println("Its a boy, nvm its speed...");
    setServoSpeed(value.toInt());
  } else if (variable == "p" || variable == "pos" || variable == "position") {
    Serial.println("Its a girl, nvm its position...");
    setServoPosition(value.toInt());
  } else {
    Serial.println("You moron, we literally told you at the start how to run it... Examples: 'speed 150' or 's 150' or 'p 10' or 'position 10'");
  }
}

void setServoPosition(unsigned short value) {
  if (value <= 180 && value >= 0) {
    pos = value;
  } else {
    Serial.println("This value is outside of the useable 0-180 range.");
  }
}

void setServoSpeed(unsigned long value) {
  if (value >= 0) {
    servoSpeed = value;
  } else {
    Serial.println("This value is outside of the useable 0-4 billion range.");
  }
}

void moveServo() {
  currentMillis = millis();
  if (currentMillis - previousMillis > servoSpeed) {
    previousMillis = currentMillis;
    if (pos <= 180 && pos >= 0) {
      if (currentPos < pos) {
        currentPos++;
      } else if (currentPos > pos) {
        currentPos--;
      }
    }
    myservo.write(currentPos);
  }
}