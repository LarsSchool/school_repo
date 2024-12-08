#include <SPI.h>
#include <mcp2515.h>

struct can_frame canMsg;
MCP2515 mcp2515(2); // Has to be something outside 6-11


void setup() {
  Serial.begin(115200);
  
  mcp2515.reset();
  mcp2515.setBitrate(CAN_125KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
  
  Serial.println("------- CAN Read ----------");
  Serial.println("ID  DLC   DATA");
}

void loop() {
  if (mcp2515.readMessage(&canMsg) == MCP2515::ERROR_OK) {
    // Serial.print(canMsg.can_id, HEX); // print CAN_ID
    // Serial.print(" "); 
    // Serial.print(canMsg.can_dlc, HEX); // print CAN_DLC (amount of data characters/bits)
    // Serial.print(" ");
    
    for (int i = 0; i<canMsg.can_dlc; i++)  {  // print all CAN_msg.data[] values
//    Serial.println(canMsg.data[i],HEX);
      Serial.println(canMsg.data[i],DEC); // Will print 208 when overflow happens
    }
  }
}
