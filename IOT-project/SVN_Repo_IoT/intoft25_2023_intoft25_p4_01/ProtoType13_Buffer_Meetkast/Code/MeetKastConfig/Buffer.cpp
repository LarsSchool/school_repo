#include "Buffer.h"
#include <stdlib.h>
#include <Arduino.h>
#include "Debug.h"

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
  return bufferMessage;
}

void setupBuffer() {
  bufferInit(&canBuffer);
}

void sendBufferMessages() {
  while (!bufferIsEmpty(&canBuffer)) {
    can_frame frame = getFromBuffer(&canBuffer);

    if (mcp2515.sendMessage(&frame) != MCP2515::ERROR_OK) {
      putBackInBuffer(&canBuffer, frame);
      break;
    }
  }
}

void putBackInBuffer(CanBuffer *canBuffer, can_frame frame) {
  canBuffer->tail = (canBuffer->tail - 1 + BUFFERSIZE) % BUFFERSIZE;
  canBuffer->bufferMessages[canBuffer->tail] = frame;
  canBuffer->count++;
  if (bufferIsFull(canBuffer)) {
    turnRedLedOn();
  }
}
