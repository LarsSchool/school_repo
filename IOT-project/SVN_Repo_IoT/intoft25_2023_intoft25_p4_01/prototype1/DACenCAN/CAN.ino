#include <SPI.h>
#include <mcp2515.h>

const unsigned int INTERVALCAN = 100;
unsigned long prevMillisCan = 0;

struct can_frame canMsg1;

unsigned short counter = 0;
bool ready = false; 

MCP2515 mcp2515(10);

void canSetup() {
  canMsg1.can_id  = 0;
  canMsg1.can_dlc = 8;
//  canMsg1.data[0] = 5;
//  canMsg1.data[1] = 10;
//  canMsg1.data[2] = 15;
//  canMsg1.data[3] = 20;
//  canMsg1.data[4] = 150;
//  canMsg1.data[5] = 15;
//  canMsg1.data[6] = 10;
//  canMsg1.data[7] = 150;
  
  mcp2515.reset();
  mcp2515.setBitrate(CAN_125KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
//  Serial.println("Example: Write to CAN");
}

void addData(unsigned short data2)
{
  if(counter < 8 && !ready)
  {
    canMsg1.data[counter] = map(data2, 1, 1000, 1, 255); // Has to be mapped, else the values will be too high.
    counter++;
  }
  else
  {
    counter = 0;
    ready = true; 
  }
}

void canSend() {
  unsigned long currentMillis = millis();
  if (currentMillis - prevMillisCan >= INTERVALCAN && ready) {
    mcp2515.sendMessage(&canMsg1);
//    Serial.println("send");
    prevMillisCan = currentMillis;
    ready = false;
  }

}
