#include <stdio.h>

#include "weer.h"

int main(int argc, char **argv) {
  double celsius = 37.5;
  double wind = 40.3;

  printf("%.1f graden Celsius is %.2f graden Fahrenheit\n", celsius,
         temperatureToF(celsius));

  printf("%.2f graden Fahrenheit is %.2f graden Celsius\n",
         temperatureToF(celsius), temperatureToC(temperatureToF(celsius)));

  printf("%.2f km/h is %i op de schaal van Beaufort\n", wind,
         windToBeaufort(wind));
}
