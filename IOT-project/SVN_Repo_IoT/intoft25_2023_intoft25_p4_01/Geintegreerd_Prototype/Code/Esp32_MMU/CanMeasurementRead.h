#ifndef _CANMEASUREMENTREAD_H_
#define _CANMEASUREMENTREAD_H_

#define AMOUNTOFBYTESINCAN 8
#define AMOUNTOFWORDINCAN 4
#define AMOUNTOFLONGINCAN 2
#define AMOUNTOFLONGLONGINCAN 1

#include "CanConfigRead.h"
#include "CanConfigSend.h"
#include "WifiServer.h"

union ReceivedDataType {
  uint8_t  data_as_bytes[AMOUNTOFBYTESINCAN];
  uint16_t data_as_unsigned_int[AMOUNTOFWORDINCAN];
  uint32_t data_as_unsigned_long[AMOUNTOFLONGINCAN];
  uint64_t data_as_unsigned_long_long;
};

void convertAndPrintCanMessage(const struct can_frame *frame);
void checkMessage();
bool check29BitsIdentifier(const struct can_frame *frame);
void printPatientData(uint32_t canId, uint64_t data);
void canToHTTP(uint64_t data);


#endif // _CANMEASUREMENTREAD_H_
