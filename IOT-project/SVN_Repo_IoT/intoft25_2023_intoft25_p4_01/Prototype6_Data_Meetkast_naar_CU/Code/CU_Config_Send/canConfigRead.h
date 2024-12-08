#ifndef _CANCONFIGREAD_H_
#define _CANCONFIGREAD_H_

#include <stdio.h>
#include <mcp2515.h>

extern MCP2515 mcp2515;

extern bool configComplete;

bool checkCompletion();
bool getConfigComplete();

#endif