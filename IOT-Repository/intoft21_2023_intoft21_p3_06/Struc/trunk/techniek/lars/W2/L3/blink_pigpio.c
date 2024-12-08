#include <signal.h>
#include <stdio.h>
#include <pigpio.h>

int main() {
   if (gpioInitialise() == PI_INIT_FAILED) {
      printf("ERROR: Failed to initialize the GPIO interface.\n");
      return 1;
   }
   gpioSetMode(21, PI_OUTPUT);
   while(1){
   gpioWrite(21, PI_HIGH);   
gpioWrite(21, PI_HIGH);
gpioWrite(21, PI_HIGH);
gpioWrite(21, PI_HIGH);
gpioWrite(21, PI_HIGH);
gpioWrite(21, PI_HIGH);
gpioWrite(21, PI_HIGH);
gpioWrite(21, PI_HIGH);
gpioWrite(21, PI_HIGH);
gpioWrite(21, PI_HIGH);   
gpioWrite(21, PI_LOW);
gpioWrite(21, PI_LOW);
gpioWrite(21, PI_LOW);
gpioWrite(21, PI_LOW);
gpioWrite(21, PI_LOW);
gpioWrite(21, PI_LOW);
gpioWrite(21, PI_LOW);
gpioWrite(21, PI_LOW);
gpioWrite(21, PI_LOW);
gpioWrite(21, PI_LOW);
 }
}
