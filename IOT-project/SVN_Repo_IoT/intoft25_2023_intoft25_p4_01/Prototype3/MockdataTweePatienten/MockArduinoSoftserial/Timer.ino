float timeArray[2];

const byte timeSize = 2;

void setupTimer() {
  for(int i = 0 ; i < timeSize ; i++)
  {
      timeArray[i] = millis();
  }
}


void setTimer(unsigned short id) {
  if(id <= timeSize)
  {
    timeArray[id] = millis();
  }
}


float getTimer(unsigned short id) {
  if(id <= timeSize)
  {
    return timeArray[id];
  }
}
