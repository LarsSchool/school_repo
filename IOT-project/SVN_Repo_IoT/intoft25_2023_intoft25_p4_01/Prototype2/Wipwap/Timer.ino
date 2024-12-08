unsigned long laatsteTijd;

void setTimer() {
  laatsteTijd = millis();
}

boolean getTimer(unsigned long aantalMillisSeconde) {
  return millis() - laatsteTijd > aantalMillisSeconde;
}