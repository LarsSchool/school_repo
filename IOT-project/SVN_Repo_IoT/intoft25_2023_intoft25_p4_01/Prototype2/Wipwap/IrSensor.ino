const unsigned short ANALOGSENSOR = A0;

void setupIrSensor() {
  pinMode(ANALOGSENSOR, INPUT);
}

int getAfstand() {
  return analogRead(ANALOGSENSOR);
}
