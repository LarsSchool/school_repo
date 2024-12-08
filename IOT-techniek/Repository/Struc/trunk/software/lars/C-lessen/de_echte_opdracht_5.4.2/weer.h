#ifndef weer_h
#define weer_h
#include <stdint.h>

#define Windkracht int8_t

typedef enum int8_t { ROOD, GEEL, GROEN } Code;

typedef struct {
  double temperatuur;
  int16_t neerslag;
  Windkracht windkracht;
} Verwachting;

Code waarschuwing(Verwachting v);
void bericht(Code c, Verwachting v);

#endif
