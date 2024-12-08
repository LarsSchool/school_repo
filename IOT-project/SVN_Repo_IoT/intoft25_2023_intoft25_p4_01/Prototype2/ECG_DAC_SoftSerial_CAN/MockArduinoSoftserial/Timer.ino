float time1, time2; 

void setTimer1() {
  time1 = millis();
}

float getTimer1()
{
  return time1;
}


float getTimer2()
{
  return time2;
}

void setTimer2() {
  time2 = millis();
}

boolean getTimer(unsigned long aantalMillisSeconde) {
  return millis() > aantalMillisSeconde;
}
