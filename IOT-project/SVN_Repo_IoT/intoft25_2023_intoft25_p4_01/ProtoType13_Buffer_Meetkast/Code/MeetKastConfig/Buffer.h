#ifndef Buffer_h
#define Buffer_h

#include <stdint.h>
#include <stdbool.h>
#include <mcp2515.h>
#include <SPI.h>

#define BUFFERSIZE 7 // Hoeveelheid pins / uit te lezen meetwaardes

// De buffer werkt met een head (kop) en tail (staart). Zo kan er bijgehouden worden 
// welk bericht er als eerste in de buffer zit. De staart geeft aan waar het volgende bericht 
// in de buffer kan komen. De tail geeft aan wat er als eerste in de buffer zat. 
// De count is het aantal berichten dat er in de buffer zitten.


typedef struct {
  can_frame bufferMessages[BUFFERSIZE]; // statisch gealloceerde array
  uint8_t head;
  uint8_t tail;             
  uint8_t count;
} CanBuffer;

extern MCP2515 mcp2515;

// maakt de buffer aan
void bufferInit(CanBuffer *canBuffer); 

bool bufferIsFull(CanBuffer *canBuffer);

bool bufferIsEmpty(CanBuffer *canBuffer);

void bufferAdd(CanBuffer *canBuffer, can_frame frame);

can_frame getFromBuffer(CanBuffer *canBuffer);

void putBackInBuffer(CanBuffer *canBuffer, can_frame frame);

void setupBuffer();

void printBuffer(CanBuffer *canBuffer);

void sendBufferMessages();

#endif
