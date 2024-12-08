#include "sensor.h"
#include <math.h>
#include <stdlib.h>

sensor* sensorInit(double aSomX2, double aSomX) {
  sensor* return_sensor = malloc(sizeof(sensor));
  if (!return_sensor) {
    return NULL;
  }
  return_sensor->somX2 = aSomX2;
  return_sensor->somX = aSomX;
  return_sensor->n = 0;

  return return_sensor;
}

void sensorAddWaarde(sensor* aSensor, double aWaarde) {
  aSensor->somX2 = aSensor->somX2 + (aWaarde * aWaarde);
  aSensor->somX = aSensor->somX + aWaarde;
  aSensor->n = aSensor->n + 1;
}

double getAvg(const sensor* aSensor) {
  // Deze if statement moet er staan, want
  // anders wordt er -NaN (not a number) gereturned.
  // -25/03/2024
  if (aSensor->somX == 0 && aSensor->n == 0) {
    return -1.0;
  }
  return (aSensor->somX /
          aSensor->n); // Bereken het gemiddelde en return
                       // dit -25/03/2024
}

double getStDev(const sensor* aSensor) {
  if (aSensor->somX == 0 && aSensor->n == 0) {
    return -1.0;
  }
  return sqrt((
      (aSensor->somX2 - (aSensor->somX * aSensor->somX /
                         (double)aSensor->n)) /
      (double)aSensor->n)); // Bereken de standaard deviatie
                            // en return dit -25/03/2024
}

void resetSensorMeasurements(sensor* aSensor) {
  aSensor->somX2 = 0.0;
  aSensor->somX = 0.0;
  aSensor->n = 0;
}
