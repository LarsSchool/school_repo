#include "canConfigRead.h"
#include "debug.h"

bool configComplete = false;

struct can_frame CanStopMsg;  

bool checkCompletion() {
  if (mcp2515.readMessage(&CanStopMsg) == MCP2515::ERROR_OK) {
    if (CanStopMsg.can_id == 0) {
     configComplete = true;
      Serial.println("CONFIG COMPLETE");
    }
  }
  return configComplete;
}

bool getConfigComplete(){
  return configComplete;
}
