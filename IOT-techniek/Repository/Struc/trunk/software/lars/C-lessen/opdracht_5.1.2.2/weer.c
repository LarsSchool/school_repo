#include "weer.h"
#include <assert.h>
#include <math.h>
#include <stdio.h>

// Functie Definitie(s)
// Precondition: celcius >= -273.15
double temperatureToF(double c) {
  assert(c >= -273.15);
#ifndef NDEBUG
  printf("Celsius * 9.0/5.0 = %f\n", (c * 9.0 / 5.0));
#endif
  return (c * 9.0 / 5.0) + 32;
}

double temperatureToC(double f) { return (f - 32) / 1.8; }

int windToBeaufort(float speed) {
  return pow((speed * 0.539957) / 0.836, (2.0 / 3.0));
}
