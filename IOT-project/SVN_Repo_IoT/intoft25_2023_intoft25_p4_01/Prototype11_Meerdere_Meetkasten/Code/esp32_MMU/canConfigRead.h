#ifndef _CANCONFIGREAD_H_
#define _CANCONFIGREAD_H_

#define AMOUNTOFMODULES 2

#include <stdio.h>
#include <mcp2515.h>

extern MCP2515 mcp2515;

extern bool configComplete;

bool checkCompletion(const struct can_frame *frame);
bool getConfigComplete();

#endif