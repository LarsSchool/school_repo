#include "canMeasurementRead.h"
#include "debug.h"

struct can_frame CanMeasurementMsg;  

void convertAndPrintCanMessage(const struct can_frame *frame)
  { 
        uint8_t resolution = frame->can_dlc;
        union receivedDataType data; // Dit geeft een warning, maar het klopt wel :/.
        switch(AMOUNTOFBYTESINCAN/resolution) // 8/ 1 = 8 bijvoorbeeld. Dit betekent dat er 8 verschillende bytes in kunnen. 8/4 = 2, dus 2 longs die erin kunnen.
          {
            case AMOUNTOFBYTESINCAN:
              data.data_as_bytes[0] = frame->data[0];
              break;
            case AMOUNTOFWORDINCAN:
              data.data_as_unsigned_int[0] = frame->data[0];
             break;
            case AMOUNTOFLONGINCAN:
              data.data_as_unsigned_long[0] = frame->data[0];
              break;
            case AMOUNTOFLONGLONGINCAN:
              data.data_as_unsigned_long_long = frame->data[0];
              break;
            default:
              data.data_as_unsigned_long_long = frame->data[0];
              break; 
          }
          data = data; // Dit is om een warning/ error te voorkomen, voor de rest wordt het niet gebruikt.
    // De code hieronder is gebouwd op dat we dus maar 1 waarde per CAN bericht hebben. Als je er meerdere in wilt stoppen zul je dit in een for loop moeten stoppen.
    if(debug){
      if (frame->can_id & CAN_EFF_FLAG) {
        Serial.print((frame->can_id) & ~CAN_EFF_FLAG, DEC); // Print 29-bit CAN ID
      } else {
        Serial.print(frame->can_id, DEC); // Print 11-bit CAN ID
      }
        Serial.print(" "); 
        Serial.print("Byte Amount: ");
        Serial.print(frame->can_dlc, DEC); // print CAN_DLC (amount of data characters/bits)
        Serial.print(" ");
        for (uint8_t bytesInMessage = 0; bytesInMessage < frame->can_dlc; bytesInMessage++)  {  // print all CAN_msg.data[] values
          Serial.print("  -  Data ");
          Serial.print(bytesInMessage);
          Serial.print(": "); 
          Serial.print(frame->data[bytesInMessage],DEC);
        }
        Serial.println();  
    } else {
      Serial.print("ID: ");
      if (frame->can_id & CAN_EFF_FLAG) {
        Serial.print((frame->can_id) & ~CAN_EFF_FLAG, DEC); // Print 29-bit CAN ID
      } else {
        Serial.print(frame->can_id, DEC); // Print 11-bit CAN ID
      }      
      Serial.print(", Data ");
      Serial.print(": "); 
      Serial.println(frame->data[0], DEC);
    }
  }

void checkMeasurementMessage() {
  if(getConfigComplete()){
    if (mcp2515.readMessage(&CanMeasurementMsg) == MCP2515::ERROR_OK) {
      convertAndPrintCanMessage(&CanMeasurementMsg);
    }
  }
}


void printPatientData(uint32_t canId, uint32_t data) {
  canToHTTP(data);
}