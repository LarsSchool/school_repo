#ifndef _CANCONFIGSEND_H_
#define _CANCONFIGSEND_H_


#include <SPI.h>
#include <Arduino.h>

#define AMOUNTOFCONFIGVALUES 6
#define AMOUNTOFPATIENTS 2
#define AMOUNTOFDATA 7
#define ROWS 14                 
#define CANMESSAGES 84

#define startID29Bit 2047

#define INTERVAL 10


typedef enum {
  MEASUREUNIT,
  CANID,
  FREQUENCY,
  RESOLUTION,
  PORT,
  PORTTYPE,
  MACHINE
} DataType;

typedef enum{
  ANALOG_PORT,
  DIGITAL_PORT
} PortType;

typedef enum{
  ECG = 0,
  HEMOGLOBIN = 1,
  CHOLESTEROL = 2,
  UPPERPRESSURE = 3,
  NEGATIVEPRESSURE = 4,
  HEARTBEAT = 5,
  OXYGENLEVEL = 6
} Machine;

typedef struct {
  uint8_t measureUnit;
  uint32_t canId;
  uint32_t frequency;
  uint32_t resolution;
  uint32_t port;
  PortType portType;
  Machine machine;
} Sensor;

extern Sensor configTable[ROWS];
extern struct can_frame CanMsg;

#define MAXAMOUNTINBYTE 256
#define MAXAMOUNTININT 65536
#define MAXAMOUNTINLONG 4294967296

#define AMOUNTOFBYTESINCAN 8
#define AMOUNTOFINTSINCAN 4
#define AMOUNTOFLONGSINCAN 2

union MyDatatype {
  uint8_t              data_as_unsigned_byte[AMOUNTOFBYTESINCAN];                       // 8 (1 Byte)    [] [] [] [] [] [] [] []
  uint16_t            data_as_unsigned_int[AMOUNTOFINTSINCAN];            // 4 (2 Bytes)   [ ]  [ ]  [ ]  [ ]
  uint32_t            data_as_unsigned_long[AMOUNTOFLONGSINCAN];       // 2 (4 Bytes)   [       ]   [          ]
  uint64_t            data_as_unsigned_long_long;                                                // 1 (8 Bytes)   [                      ]
};

void sendConfig();
void sendConfigRows();
void addDataToTable(uint8_t measureUnit, uint32_t CANID, uint32_t frequency, uint32_t resolution, uint32_t port, PortType portType, Machine machine);     
uint32_t getAmountOfCanMessages();
void resetConfig();
uint32_t getValue(uint16_t row, uint16_t collumn);
void clearCANMessage();
void fillDataInCANMessage(uint8_t canDLC, uint32_t value);
void testCAN();
bool checkCompletion();
uint8_t calculateCANdlc(uint16_t row, uint16_t collumn);
void fillTable();  
void canSetup();

#endif
