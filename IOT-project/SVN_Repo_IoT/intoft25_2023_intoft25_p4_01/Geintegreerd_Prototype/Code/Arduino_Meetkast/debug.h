#ifndef DEBUG_H
#define DEBUG_H

#include <Arduino.h>
#include <stdint.h>
#include "Buffer.h"
#include "Can.h"

// Er kan gebruikt gemaakt worden van de debug variabele voor meerdere println's, hiervoor kan je dan gewoon Serial.print() gebruiken in de code.
// Daarnaast kan je ook de functies gebruiken voor als snel 1 functie wilt laten printen, maar dan wordt er gekeken naar de debug variabele in de print functie.


#define BUFFER_LED 7

extern bool debug;

extern CanBuffer canBuffer;

void printString(const char* value, bool println);
void printInteger(int32_t value, bool println);
void serialBegin(uint32_t baudRate);
void setupLeds();
void turnRedLedOn();
void turnRedLedOff();
void printBuffer(CanBuffer *canBuffer);
void makeCanTestMessage();
void fillBufferWithOneMessageTest();
void fullyFillTheBuffer();
void testCanMessage();

#endif // DEBUG_H
