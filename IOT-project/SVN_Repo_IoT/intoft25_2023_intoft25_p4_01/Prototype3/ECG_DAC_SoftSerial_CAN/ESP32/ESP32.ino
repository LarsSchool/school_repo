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
  /*Voorbeeld van hoe dit geprint wordt: 
  ID: 4 CharAmount: 8   -  Data 0: 80  -  Data 1: 0  -  Data 2: 0  -  Data 3: 0  -  Data 4: 0  -  Data 5: 0  -  Data 6: 0  -  Data 7: 0
  Hierin is ID het ID van het CAN bericht én ook het machineID.
  CharAmount is CAN_DLC, dus hoeveel data chars/ bits er zijn.
  Voor alle data is het op de tijd van schrijven (06-05-2024) zo dat het nummer de patiëntID is. Dus in het voorbeeldje hierboven is de waarde 80 de waarde van patiënt 0 vanuit machine 4.
  */
  if (mcp2515.readMessage(&canMsg) == MCP2515::ERROR_OK) {
     Serial.print("ID: ");
     Serial.print(canMsg.can_id, HEX); // print CAN_ID
     Serial.print(" "); 
     Serial.print("CharAmount: ");
     Serial.print(canMsg.can_dlc, HEX); // print CAN_DLC (amount of data characters/bits)
     Serial.print(" ");
    
    for (int i = 0; i < canMsg.can_dlc; i++)  {  // print all CAN_msg.data[] values
   // Serial.println(canMsg.data[i],HEX);
      Serial.print("  -  Data ");
      Serial.print(i);
      Serial.print(": "); 
      Serial.print(canMsg.data[i],DEC); // Will print 208 when overflow happens
    }
    Serial.println();
  }
}
