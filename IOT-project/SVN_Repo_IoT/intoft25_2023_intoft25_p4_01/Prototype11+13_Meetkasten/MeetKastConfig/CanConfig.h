#ifndef CanConfig_h
#define CanConfig_h

#include <stdint.h>

// voor de configuratietabel
#define AMOUNTOFCONFIGVALUES 6
#define AMOUNTOFMAXDATAROWS 30

// voor de can data uitlezen
#define AMOUNTOFBYTESINCAN 8
#define AMOUNTOFWORDINCAN 4
#define AMOUNTOFLONGINCAN 2
#define AMOUNTOFLONGLONGINCAN 1

union ConfigCantype {
  uint8_t  data_as_bytes[AMOUNTOFBYTESINCAN];
  uint16_t data_as_unsigned_int[AMOUNTOFWORDINCAN];
  uint32_t data_as_unsigned_long[AMOUNTOFLONGINCAN];
  uint64_t data_as_unsigned_long_long;
};

uint64_t processConfigData(union ConfigCantype data, uint8_t dataType);

uint32_t getRowId(uint64_t id);

uint32_t getColumnId(uint64_t id);


#endif
