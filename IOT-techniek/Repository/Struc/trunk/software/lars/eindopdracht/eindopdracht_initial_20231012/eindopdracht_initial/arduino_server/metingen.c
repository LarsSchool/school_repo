#include "metingen.h"
#include <stddef.h>

// Deze globable variabelen moeten globaal zijn, omdat ze
// anders uit het geheugen verwijderd worden :/ -25/03/2024
sensor* sensor1 = NULL;
sensor* sensor2 = NULL;
cbuffer* cbuff_sensor1 = NULL;
cbuffer* cbuff_sensor2 = NULL;

void initiateStructs() {
  sensor1 = sensorInit(0.0, 0.0);
  sensor2 = sensorInit(0.0, 0.0);

  // Standaard size is 5, wordt alleen hier gebruikt en
  // daarom de hard coded waarde. -25/03/2024
  cbuff_sensor1 = cbInit(12, OVERWRITE_IF_FULL);
  cbuff_sensor2 = cbInit(12, OVERWRITE_IF_FULL);
}

sensor* getSensor1() { return sensor1; }

sensor* getSensor2() { return sensor2; }

cbuffer* getCbuffer_sensor1() { return cbuff_sensor1; }

cbuffer* getCbuffer_sensor2() { return cbuff_sensor2; }

void setCbuffer_sensor1(cbuffer* buffer) {
  cbuff_sensor1 = buffer;
}

void setCbuffer_sensor2(cbuffer* buffer) {
  cbuff_sensor2 = buffer;
}
