#include "CanConfig.h"

uint64_t processConfigData(union ConfigCantype data, uint8_t dataType)
{
    //Calculate which datatype we are handeling. Do this by deviding 8(how many bytes fits in a can) with the can message data length.
    switch(AMOUNTOFBYTESINCAN/dataType)
    {
        case AMOUNTOFBYTESINCAN:
          return data.data_as_bytes[0];
          break;
        case AMOUNTOFWORDINCAN:
          return data.data_as_unsigned_int[0];
          break;
        case AMOUNTOFLONGINCAN:
          return data.data_as_unsigned_long[0];
          break;
        case AMOUNTOFLONGLONGINCAN:
          return data.data_as_unsigned_long_long;
          break;
        default:
          return data.data_as_unsigned_long_long;
          break;
    }
}

uint32_t getRowId(uint64_t id)
{
  return id / AMOUNTOFCONFIGVALUES;
}

uint32_t getColumnId(uint64_t id)
{
  return id % AMOUNTOFCONFIGVALUES;
}
