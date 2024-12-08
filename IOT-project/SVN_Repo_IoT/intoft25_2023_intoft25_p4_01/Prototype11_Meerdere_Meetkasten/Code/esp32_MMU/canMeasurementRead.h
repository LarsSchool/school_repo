#ifndef _CANMEASUREMENTREAD_H_
#define _CANMEASUREMENTREAD_H_

#define AMOUNTOFBYTESINCAN 8
#define AMOUNTOFWORDINCAN 4
#define AMOUNTOFLONGINCAN 2
#define AMOUNTOFLONGLONGINCAN 1

#include "canConfigRead.h"

union ReceivedDataType {
  uint8_t  data_as_bytes[AMOUNTOFBYTESINCAN];
  uint16_t data_as_unsigned_int[AMOUNTOFWORDINCAN];
  uint32_t data_as_unsigned_long[AMOUNTOFLONGINCAN];
  uint64_t data_as_unsigned_long_long;
};

void printCanMessage(const struct can_frame *frame);
void checkMessage();
bool check29BitsIdentifier(const struct can_frame *frame);

#endif // _CANMEASUREMENTREAD_H_
