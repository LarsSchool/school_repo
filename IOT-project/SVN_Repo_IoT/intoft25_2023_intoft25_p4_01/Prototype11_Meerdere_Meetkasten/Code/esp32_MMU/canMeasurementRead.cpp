#include "canMeasurementRead.h"
#include "debug.h"

struct can_frame CanMsg;  

void convertAndPrintCanMessage(const struct can_frame *frame)
  {     
        uint8_t resolution = frame->can_dlc;
        uint64_t canResult;
        union ReceivedDataType data; // Dit geeft een warning, maar het klopt wel :/.
        for(uint8_t byte = 0; byte < AMOUNTOFBYTESINCAN; byte++){
              data.data_as_bytes[byte] = frame->data[byte];
        }
        switch(AMOUNTOFBYTESINCAN/resolution) // 8/ 1 = 8 bijvoorbeeld. Dit betekent dat er 8 verschillende bytes in kunnen. 8/4 = 2, dus 2 longs die erin kunnen.
          {
            case AMOUNTOFBYTESINCAN:
              canResult = data.data_as_bytes[0];
              break;
            case AMOUNTOFWORDINCAN:
              canResult = data.data_as_unsigned_int[0];
             break;
            case AMOUNTOFLONGINCAN:
              canResult = data.data_as_unsigned_long[0];
              break;
            case AMOUNTOFLONGLONGINCAN:
              canResult = data.data_as_unsigned_long_long;
              break;
            default:
              canResult = data.data_as_unsigned_long_long;
              break; 
          }
//          data = data; // Dit is om een warning/ error te voorkomen, voor de rest wordt het niet gebruikt.
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
      Serial.println(canResult, DEC);
    }
  }

void checkMessage() {
    if (mcp2515.readMessage(&CanMsg) == MCP2515::ERROR_OK) {
      if(check29BitsIdentifier(&CanMsg)){ // Check to see if the ID is from a Measure Unit (29 bits)
        if((CanMsg.can_id & ~CAN_EFF_FLAG) > 2047){ // Less than 2048 is for the  stop messages, so more than that will be a measurement that got send.
          convertAndPrintCanMessage(&CanMsg);
        } else {
          checkCompletion(&CanMsg);
        }
      }
      // You can put an else here to handle 11-bit identifiers.
    }
}

bool check29BitsIdentifier(const struct can_frame *frame){
  if (frame->can_id & CAN_EFF_FLAG) {
    if(debug){
      Serial.print("29-bit canID: ");
      Serial.println((frame->can_id) & ~CAN_EFF_FLAG, DEC); // Print 29-bit CAN ID
    }
    return true;
  } else {
    if(debug){
      Serial.print("11-bit canID: ");
      Serial.println(frame->can_id, DEC); // Print 11-bit CAN ID
    }
    return false;
  }
}
