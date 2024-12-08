#include "Buffer.h"
#include <stdlib.h>
#include <Arduino.h>
#include "debug.h"

CanBuffer canBuffer;

void bufferInit(CanBuffer *canBuffer) {
  canBuffer->head = 0;
  canBuffer->tail = 0;
  canBuffer->count = 0;
}

bool bufferIsFull(CanBuffer *canBuffer) {
  return canBuffer->count == BUFFERSIZE;
}

bool bufferIsEmpty(CanBuffer *canBuffer) {
  return canBuffer->count == 0;
}

void bufferAdd(CanBuffer *canBuffer, can_frame bufferMessage) {
  if (bufferIsFull(canBuffer)) {
    return;
  }
  if (debug) {
    Serial.println("Message added to buffer");
  }
  canBuffer->bufferMessages[canBuffer->head] = bufferMessage;
  canBuffer->head = (canBuffer->head + 1) % BUFFERSIZE;
  canBuffer->count++;
  printBuffer(canBuffer);
  if (bufferIsFull(canBuffer)) {
    turnRedLedOn();
  }
}

can_frame getFromBuffer(CanBuffer *canBuffer) {
  can_frame bufferMessage = canBuffer->bufferMessages[canBuffer->tail];
  canBuffer->tail = (canBuffer->tail + 1) % BUFFERSIZE;
  canBuffer->count--;
  turnRedLedOff();
  if (debug) {
    Serial.println("Message removed from buffer");
  }
  printBuffer(canBuffer);
  return bufferMessage;
}

void setupBuffer() {
  bufferInit(&canBuffer);
}
