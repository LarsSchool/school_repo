#include "weer.h"
#include <math.h>

// Functie Definitie(s)
double temperatureToF(double c) { return (c * 9.0 / 5.0) + 32; }

double temperatureToC(double f) { return (f - 32) / 1.8; }

int windToBeaufort(float speed) {
  return pow((speed * 0.539957) / 0.836, (2.0 / 3.0));
}
