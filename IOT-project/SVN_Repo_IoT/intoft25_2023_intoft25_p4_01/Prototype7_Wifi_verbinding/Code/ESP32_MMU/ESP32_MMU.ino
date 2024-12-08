#include "WiFi_Server.h"
#include "CAN.h"
#include "debug.h"
/* Required libraries for WiFi connection.
https://github.com/lacamera/ESPAsyncWebServer
https://github.com/dvarrel/ESPAsyncTCP 
https://github.com/dvarrel/AsyncTCP */

void setup() {
  serialBegin(115200);
  wifiSetup();
  canSetup();
}

void loop() {
  /*Voorbeeld van hoe dit geprint wordt: 
  ID: 4 CharAmount: 8   -  Data 0: 80  -  Data 1: 0  -  Data 2: 0  -  Data 3: 0  -  Data 4: 0  -  Data 5: 0  -  Data 6: 0  -  Data 7: 0
  Hierin is ID het ID van het CAN bericht én ook het machineID.
  CharAmount is CAN_DLC, dus hoeveel data chars/ bits er zijn.
  Voor alle data is het op de tijd van schrijven (06-05-2024) zo dat het nummer de patiëntID is. Dus in het voorbeeldje hierboven is de waarde 80 de waarde van patiënt 0 vanuit machine 4.
  */
  canLoop();
}