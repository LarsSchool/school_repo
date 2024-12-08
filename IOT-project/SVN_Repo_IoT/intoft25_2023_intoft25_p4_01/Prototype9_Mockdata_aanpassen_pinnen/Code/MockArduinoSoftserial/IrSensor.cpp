#include "IrSensor.h"

unsigned short analogSensorPins[] = {A1, A2};

void setupIrSensor() {
  for(int i = 0 ; i < analogSensorSize; i ++)
  {
    pinMode(INPUT, analogSensorPins[i]);
  }
}

int getAfstand(unsigned short id) {
  if(id <= analogSensorSize)
  {
      return analogRead(analogSensorPins[id]);
  }else
  {
    return 0;
  }
}
