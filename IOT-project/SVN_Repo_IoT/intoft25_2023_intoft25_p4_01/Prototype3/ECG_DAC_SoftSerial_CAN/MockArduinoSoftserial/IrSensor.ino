const unsigned short ANALOGSENSOR = A1;

void setupIrSensor() {
  pinMode(ANALOGSENSOR, INPUT);
}

int getAfstand() {
  return analogRead(ANALOGSENSOR);
}
