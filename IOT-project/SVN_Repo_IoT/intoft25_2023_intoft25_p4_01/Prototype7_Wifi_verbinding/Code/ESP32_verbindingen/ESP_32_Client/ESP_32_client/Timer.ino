unsigned long previousMillis = 0;
const long INTERVAL = 5000;
const long WAITING = 500;


long getINTERVAL() {
  return INTERVAL;
}

long getWaiting() {
  return WAITING;
}

void setTimer() {
  previousMillis = millis();
}

boolean getTimer(unsigned long interval) {
  return millis() - previousMillis >= interval;
}
