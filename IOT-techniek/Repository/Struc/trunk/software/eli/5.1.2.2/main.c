#include <stdio.h>
#include "converter.h"

int main(){

    double celcius = 987.654;
    double ms = 21;

    printf("%.1f graden celcius is %.2f graden fahrenheit\n", celcius, temperatureToFsrenheit(celcius));

    printf("%.3f ms, %.3f knots, %.0f beauford", ms, mstoknots(ms), mstobeauf(ms));
    // return 0;
}
