#include <Arduino.h>

void setup()
{
  DDRB = 0x04;
  while(true){
    PINB = 0b00000000; 
    delay(200);  
    PINB = 0b00000100;
    delay(200);  
  }
}
