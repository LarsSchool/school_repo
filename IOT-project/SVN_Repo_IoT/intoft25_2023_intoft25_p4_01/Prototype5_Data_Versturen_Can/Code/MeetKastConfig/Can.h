#ifndef Can_h
#define Can_h

#include <SPI.h>
#include <mcp2515.h>

#define MAX11BITVALUE 2047
#define MAX25BITVALUE 33554431

#define MEASUREUNITID 1

extern "C" {
#include "CanConfig.h"
}

typedef enum {
  PORTTYPE_ANALOG,
  PORTTYPE_DIGITAL
} PortType;

typedef enum {
  MEASUREUNIT,
  CANID,
  FREQUENCY,
  RESOLUTION,
  PORT,
  PORTTYPE
} DataType;

typedef struct{
   uint32_t measureUnit;  
   uint32_t canId;
   uint32_t frequency;
   uint32_t resolution;
   uint32_t port;
   PortType portType;
   uint64_t previousMillis;
} Sensor;



void setupSensor(uint32_t row);

void setupMeasurementCanMessage(uint32_t row);

void sendMeasurements();

void canSetup();

void readConfigCan();

void sortData(uint64_t Data, uint32_t canMessageId);

void resetCanMessage(struct can_frame *frame);

void printCanMessage(const struct can_frame *frame);

void printConfigTable();

void mockData();

bool checkTableConfigured();

bool checkConfigMode();

#endif
