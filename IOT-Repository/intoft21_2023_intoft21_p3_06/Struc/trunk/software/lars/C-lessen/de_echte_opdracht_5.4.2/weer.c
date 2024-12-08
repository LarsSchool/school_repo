#include "weer.h"
#include <stdio.h>

Code waarschuwing(Verwachting v) {
  if (v.neerslag > 80 || v.temperatuur > 35.0 || v.temperatuur < -15.0 ||
      v.windkracht > 8) {
    return ROOD;
  } else if (v.neerslag > 30 || v.temperatuur > 30.0 || v.temperatuur < -10.0 ||
             v.windkracht > 5) {
    return GEEL;
  } else {
    return GROEN;
  }
}

void bericht(Code c, Verwachting v) {
  printf("!! Weeralarm: neerslag: %i mm, temperatuur: %f celcius, windkracht: "
         "%i\n",
         v.neerslag, v.temperatuur, v.windkracht);
}
