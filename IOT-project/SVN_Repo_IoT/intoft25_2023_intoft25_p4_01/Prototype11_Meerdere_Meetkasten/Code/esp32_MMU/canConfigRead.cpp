#include "canConfigRead.h"
#include "debug.h"

bool configComplete = false;
uint8_t amountOfStopMessagesReceived = 0;

bool checkCompletion(const struct can_frame *frame) {
  if(debug){
    Serial.println("RECEIVED A STOP MESSAGE WITH ID: ");
    Serial.println(frame->can_id & ~CAN_EFF_FLAG);
  }
  amountOfStopMessagesReceived++;
    configComplete = (amountOfStopMessagesReceived >= AMOUNTOFMODULES);
  return configComplete;
}

bool getConfigComplete(){
  return configComplete;
}
