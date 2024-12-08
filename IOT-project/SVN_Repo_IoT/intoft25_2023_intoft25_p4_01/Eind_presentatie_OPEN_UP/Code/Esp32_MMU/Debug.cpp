#include "Debug.h"

bool debug = false; // True or false

void printString(const char* value, bool println) {
  if (debug) {
    Serial.print(value);
    if(println){
      Serial.println();
    }
  }
}

void printInteger(int32_t value, bool println) {
  if (debug) {
    Serial.print(value);
    if(println){
      Serial.println();
    }
  }
}

void serialBegin(uint32_t baudRate){
  if(debug){
    Serial.begin(baudRate);
  }
}
