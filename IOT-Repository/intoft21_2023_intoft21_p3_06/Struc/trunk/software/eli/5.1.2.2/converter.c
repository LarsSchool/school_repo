#include "converter.h"
#include <math.h>

double temperatureToFsrenheit(double celcius){
    return (celcius * 9.0 / 5.0) + 32.0;
}

double mstoknots(double ms){
    return ms * 1.94384;
}

double mstobeauf(double ms ){
    return knotstobeauf(mstoknots(ms));
}

double beauftoms(double beauf){
    return pow(0.836 * beauf, 2 / 3);
}

double knotstobeauf(double knots){
    return (knots + 5) / 5;
}
