#include "canMeasurementRead.h"
#include "debug.h"

struct can_frame CanMeasurementMsg;  

const uint8_t DIFFERENTPATIENTAMOUNT = 2;
const uint8_t DIFFERENTMACHINEAMOUNT = 7;
long patientData[DIFFERENTPATIENTAMOUNT][DIFFERENTMACHINEAMOUNT];

bool printCanMessage(const struct can_frame *frame) { 
  uint8_t resolution = frame->can_dlc;
  union receivedDataType data;
  switch(8/resolution)
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
    if (frame->can_id & CAN_EFF_FLAG) {
      printPatientData((frame->can_id) & ~CAN_EFF_FLAG, frame->data[0]); // Prints data for both patients
    } else {
      Serial.print("ID: ");
      Serial.print(frame->can_id, DEC); // Print 11-bit CAN ID
      Serial.print(", Data ");
      Serial.print(": "); 
      Serial.println(frame->data[0], DEC);
    }
  }
  return 0;
}
  
bool checkMeasurementMessage() {
  if(getConfigComplete()){
    if (mcp2515.readMessage(&CanMeasurementMsg) == MCP2515::ERROR_OK) {
      printCanMessage(&CanMeasurementMsg);
    }
    return 1;
  } else {
    return 0;
  }
}

void printPatientData(uint32_t canId, uint32_t data)
{
  int tempPatientId = rand() % 2; // Data toewijzen aan patiënt voor demo
  for (int i = 0; i < ROWS; i++) {
    if(configTable[i].canId == canId)
    {
      patientData[tempPatientId][configTable[i].machine]= data;
    }
  }

  for (int patientId = 0; patientId < DIFFERENTPATIENTAMOUNT; ++patientId) {
    for (int machineId = 0; machineId < DIFFERENTMACHINEAMOUNT; ++machineId) {
      Serial.print(patientData[patientId][machineId]);
      Serial.print(" ");
    }
  }
  Serial.println();
}
