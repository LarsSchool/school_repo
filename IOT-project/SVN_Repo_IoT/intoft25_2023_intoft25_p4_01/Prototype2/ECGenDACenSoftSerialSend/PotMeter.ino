unsigned short getPotValue(){
  unsigned short value = analogRead(A0);
  return value;
}

void setPauseLength() {
  if (getPotValue() >= 0 && getPotValue() < 128) {
    ecgPauseLength = 10;
  }
  else if (getPotValue() >= 128 && getPotValue() < 256) {
    ecgPauseLength = 20;
  }
  else if (getPotValue() >= 256 && getPotValue() < 384) {
    ecgPauseLength = 40;
  }
  else if (getPotValue() >= 384 && getPotValue() < 512) {
    ecgPauseLength = 80;
  }
  else if (getPotValue() >= 512 && getPotValue() < 640) {
    ecgPauseLength = 160;
  }
  else if (getPotValue() >= 640 && getPotValue() < 768) {
    ecgPauseLength = 320;
  }
  else if (getPotValue() >= 768 && getPotValue() < 896) {
    ecgPauseLength = 500;
  }
  else {
    ecgPauseLength = 1000;
  }
}
