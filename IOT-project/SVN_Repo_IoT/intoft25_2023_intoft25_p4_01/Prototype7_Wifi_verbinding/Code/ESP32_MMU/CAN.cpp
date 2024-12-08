#include "CAN.h"
#include "debug.h"
#include <Arduino.h>
#include <SPI.h>
#include <mcp2515.h>

struct can_frame CanMsg;
MCP2515 mcp2515(2); // Has to be something outside 6-11

void canSetup(){
  mcp2515.reset();
  mcp2515.setBitrate(CAN_125KBPS, MCP_8MHZ);
  mcp2515.setNormalMode
  ();
  
  if(debug){
  Serial.println("------- CAN Read ----------");
  Serial.println("ID   DLC   DATA");
  }
}

void canLoop(){
  if(debug){
    if (mcp2515.readMessage(&CanMsg) == MCP2515::ERROR_OK) {
      Serial.print("ID: ");
      Serial.print(CanMsg.can_id, DEC); // print CAN_ID
      Serial.print(" "); 
      Serial.print("CharAmount: ");
      Serial.print(CanMsg.can_dlc, DEC); // print CAN_DLC (amount of data characters/bits)
      Serial.print(" ");
      
      for (int i = 0; i < CanMsg.can_dlc; i++)  {  // print all CAN_msg.data[] values
        Serial.print("  -  Data ");
        Serial.print(i);
        Serial.print(": "); 
        Serial.print(CanMsg.data[i],DEC); // Will print 208 when overflow happens
      }
      Serial.println();
    }
  }
}