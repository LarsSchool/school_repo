unsigned short getPotValue() {
  unsigned short value = analogRead(A0);
  return value;
}

void setPauseLength() {
  unsigned short factor = 5;
  ecgPauseLength = getPotValue() * factor;
}
