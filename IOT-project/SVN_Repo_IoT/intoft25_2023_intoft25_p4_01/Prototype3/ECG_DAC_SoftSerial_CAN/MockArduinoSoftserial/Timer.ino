float time; 

void setTimer() {
  time = millis();
}

boolean getTimer(unsigned long aantalMillisSeconde) {
  return millis() > aantalMillisSeconde;
}
