#include <SPI.h>
#include <mcp2515.h>

MCP2515 mcp2515(10);

struct can_frame canMsg;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  mcp2515.reset();
  mcp2515.setBitrate(CAN_1000KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("Testing");
  if (mcp2515.readMessage(&canMsg) == MCP2515::ERROR_OK) 
  {
    Serial.println("RECEIVED");
    printCanMessage(&canMsg);
  }
  delay(100);
}

void printCanMessage(const struct can_frame *frame)
{
  Serial.print("ID: ");
  Serial.print((frame->can_id) & ~CAN_EFF_FLAG); // print CAN_ID
  Serial.print(" "); 
  Serial.print("Byte Amount: ");
  Serial.print(frame->can_dlc, DEC); // print CAN_DLC (amount of data characters/bits)
  Serial.print(" ");
  for (uint8_t bytesInMessage = 0; bytesInMessage < frame->can_dlc; bytesInMessage++)  {  // print all CAN_msg.data[] values
    Serial.print("  -  Data ");
    Serial.print(bytesInMessage);
    Serial.print(": "); 
    Serial.print(frame->data[bytesInMessage],DEC); // Will print 208 when overflow happens
  }
  Serial.println();
}
