#include "debug.h"
#include "Can.h"

bool debug = true; // True or false

can_frame testMsg;

extern MCP2515 mcp2515;

void printString(const char* value, bool println) {
  if (debug) {
    Serial.print(value);
    if (println) {
      Serial.println();
    }
  }
}

void printInteger(int32_t value, bool println) {
  if (debug) {
    Serial.print(value);
    if (println) {
      Serial.println();
    }
  }
}

void serialBegin(uint32_t baudRate) {
  if (debug) {
    Serial.begin(baudRate);
  }
}

void setupLeds() {
  pinMode(BUFFER_LED, OUTPUT);
}

void turnRedLedOn() {
  digitalWrite(BUFFER_LED, HIGH);
}

void turnRedLedOff() {
  digitalWrite(BUFFER_LED, LOW);
}

void printBuffer(CanBuffer *canBuffer) {
  if (debug) {
    Serial.println("CAN-buffer: ");
    Serial.print("Aantal - ");
    Serial.println(canBuffer->count);
    Serial.print("Staart - ");
    Serial.println(canBuffer->tail);
    Serial.print("Kop - ");
    Serial.println(canBuffer->head);
  }
}

void makeCanTestMessage() {
  testMsg.can_id = 100;
  testMsg.can_dlc = 2;
  testMsg.data[0] = 1;
  testMsg.data[1] = 2;
}

void fillBufferWithOneMessageTest() {
  makeCanTestMessage();
  bufferAdd(&canBuffer, testMsg);
}

void fullyFillTheBuffer() {
  makeCanTestMessage();
  for (int amountOfMessages = 0; amountOfMessages < BUFFERSIZE; amountOfMessages++) {
    bufferAdd(&canBuffer, testMsg);
  }
  printBuffer(&canBuffer);
}
