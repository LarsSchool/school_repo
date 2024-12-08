const unsigned short ANALOGSENSOR1 = A1;
const unsigned short ANALOGSENSOR2 = A2;

void setupIrSensor() {
  pinMode(ANALOGSENSOR1, INPUT);
  pinMode(ANALOGSENSOR2, INPUT);
}

int getAfstand1() {
  return analogRead(ANALOGSENSOR1);
}

int getAfstand2() {
  return analogRead(ANALOGSENSOR2);
}
