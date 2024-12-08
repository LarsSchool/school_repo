#ifndef sensor_h
#define sensor_h
#include <stdint.h>

typedef struct {
  double somX2; // Som van X²
  double somX;  // Som van X
  int16_t n;    // Aantal van X
} sensor; // 2 instanties bestaan hiervan in het geheugen,
          // eentje voor sensor 1 en eentje voor sensor 2

sensor* sensorInit(double aSomX2, double aSomX);

// De functionaliteit/ het rekenwerk zit binnen in de c-code
// van deze functie.
void sensorAddWaarde(sensor* aSensor, double aWaarde);

double getAvg(const sensor* aSensor);
double getStDev(const sensor* aSensor);

void resetSensorMeasurements(sensor* aSensor);

#endif