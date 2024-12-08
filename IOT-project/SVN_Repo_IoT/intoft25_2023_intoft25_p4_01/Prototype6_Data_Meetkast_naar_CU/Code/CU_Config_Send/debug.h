#ifndef DEBUG_H
#define DEBUG_H

#include <Arduino.h>
#include <stdint.h>
#include <mcp2515.h>

// Er kan gebruikt gemaakt worden van de debug variabele voor meerdere println's, hiervoor kan je dan gewoon Serial.print() gebruiken in de code.
// Daarnaast kan je ook de functies gebruiken voor als snel 1 functie wilt laten printen, maar dan wordt er gekeken naar de debug variabele in de print functie.

extern bool debug;
extern MCP2515 mcp2515;
extern can_frame CanConfigMsg;

void printString(const char* value, bool println);
void printInteger(int32_t value, bool println);
void serialBegin(uint32_t baudRate);
void testCAN();

#endif // DEBUG_H