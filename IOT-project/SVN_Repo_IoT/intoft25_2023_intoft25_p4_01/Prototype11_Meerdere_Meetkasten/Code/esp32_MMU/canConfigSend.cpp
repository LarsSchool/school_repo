#include <mcp2515.h>
#include "canConfigSend.h"
#include "canConfigRead.h"
#include "debug.h"

MCP2515 mcp2515(2); // for esp its 2 for arduino its 10
struct can_frame CanConfigMsg;

Sensor configTable[ROWS];

uint16_t arrayRow = 0; 
uint16_t arrayCollumn = 0; 
uint16_t canId = 1;

uint64_t previousMillis;
uint64_t currentMillis = 0;



uint32_t getAmountOfCanMessages()
{
  return AMOUNTOFCONFIGVALUES * AMOUNTOFDATA * AMOUNTOFPATIENTS;
}

void printValues() {
  if(debug){
    for (int i = 0; i < ROWS; i++) {
      Serial.print("Sensor ");
      Serial.println(i);
      Serial.print(configTable[i].measureUnit);
      Serial.print(" - ");
      Serial.print(configTable[i].canId);
      Serial.print(" - ");
      Serial.print(configTable[i].frequency);
      Serial.print(" - ");
      Serial.print(configTable[i].resolution);
      Serial.print(" - ");
      Serial.println(configTable[i].port);
    }
  }
}

void canSetup(){
  mcp2515.reset();
  mcp2515.setBitrate(CAN_125KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
}

void addDataToTable(uint8_t measureUnit, uint32_t canID, uint32_t frequency, uint32_t resolution, uint32_t port, PortType portType)
{
  if (arrayRow < ROWS)
  {
    configTable[arrayRow].measureUnit = measureUnit;
    configTable[arrayRow].canId = canID;
    configTable[arrayRow].frequency = frequency;
    configTable[arrayRow].resolution = resolution;
    configTable[arrayRow].port = port;
    configTable[arrayRow].portType = portType;
    arrayRow++;
  }
}

void fillTable()
{
  // Meetkast, CAN-id, Frequentie, Resolutie, Poort, Poorttype (D of A)
  addDataToTable(1, (1+startID29Bit), 300, 4, 0, ANALOG_PORT);  // ECG P1
  addDataToTable(1, (2+startID29Bit), 150, 2, 6, DIGITAL_PORT);  // Hemoglobine P1
  addDataToTable(1, (3+startID29Bit), 150, 2, 5, DIGITAL_PORT);  // Cholesterol P1
  addDataToTable(1, (4+startID29Bit), 150, 2, 4, DIGITAL_PORT);  // Bovendruk P1
  addDataToTable(1, (5+startID29Bit), 150, 4, 2, DIGITAL_PORT);  // Onderdruk P1
  addDataToTable(1, (6+startID29Bit), 150, 2, 8, DIGITAL_PORT);  // Hartslag P1
  addDataToTable(1, (7+startID29Bit), 150, 1, 2, DIGITAL_PORT); // PID P1

  addDataToTable(2, (8+startID29Bit), 150, 1, 1 , ANALOG_PORT); // ECG P2
  addDataToTable(2, (9+startID29Bit), 150, 2, 2, DIGITAL_PORT); // Hemoglobine P2
  addDataToTable(2, (10+startID29Bit), 150, 2, 3, DIGITAL_PORT); // Cholesterol P1
  addDataToTable(2, (11+startID29Bit), 150, 8, 4, DIGITAL_PORT);  // Bovendruk P1
  addDataToTable(2, (12+startID29Bit), 150, 4, 5, DIGITAL_PORT);  // Onderdruk P1
  addDataToTable(2, (13+startID29Bit), 150, 2, 6, DIGITAL_PORT);  // Hartslag P1
  addDataToTable(2, (14+startID29Bit), 150, 2, 7, DIGITAL_PORT);  // PID P1
}

void sendConfig()
{ 
  if (!getConfigComplete())
  {
    currentMillis = millis();

    if (currentMillis - previousMillis >= INTERVAL) 
    {
      if(canId-1 == 0){
        sendConfigRows();
      }
      previousMillis = currentMillis;

      CanConfigMsg.can_id = canId;
      CanConfigMsg.can_dlc = calculateCANdlc(arrayRow, arrayCollumn);
      fillDataInCANMessage(CanConfigMsg.can_dlc, getValue(arrayRow, arrayCollumn));
      mcp2515.sendMessage(&CanConfigMsg);
      if(debug){
        Serial.print("CAN-id : ");
        Serial.println(canId);
        Serial.print("CANdlc = ");
        Serial.println(CanConfigMsg.can_dlc);
        for (uint8_t byteNr = 0; byteNr < CanConfigMsg.can_dlc; byteNr++) {
          Serial.print(" Byte ");
          Serial.print(byteNr);
          Serial.print(" : ");
          Serial.println(CanConfigMsg.data[byteNr]);
        }
       Serial.println("Message Sent");
      }

      canId++;
      arrayCollumn++;

      if (arrayCollumn % AMOUNTOFCONFIGVALUES == 0)
      {
        arrayRow++;
        arrayCollumn = 0;
      }
    }
    clearCANMessage();
  }
  if (arrayRow == ROWS)
  {
    resetConfig();
  }
}

void sendConfigRows()
{ 
      CanConfigMsg.can_id = 0;
      CanConfigMsg.can_dlc = 4; 
      fillDataInCANMessage(CanConfigMsg.can_dlc, ROWS);
      mcp2515.sendMessage(&CanConfigMsg);
      if(debug){
        Serial.print("CAN-id-Rows : ");
        Serial.println(CanConfigMsg.can_id);
        Serial.print("CANdlc = ");
        Serial.println(CanConfigMsg.can_dlc);
        for (uint8_t byteNr = 0; byteNr < CanConfigMsg.can_dlc; byteNr++) {
          Serial.print(" Byte ");
          Serial.print(byteNr);
          Serial.print(" : ");
          Serial.println(CanConfigMsg.data[byteNr]);
        }
       Serial.println("Message Sent");
      }

    clearCANMessage();
}

void resetConfig()
{
  arrayRow = 0;
  arrayCollumn = 0;
  canId = 1;
}

uint8_t calculateCANdlc(uint16_t row, uint16_t column)
{
  uint64_t value = getValue(row, column);
  uint8_t canDlc;
  if (value < MAXAMOUNTINBYTE)
  {
    canDlc = 1;
    return canDlc;
  }
  else if (value >= MAXAMOUNTINBYTE && value < MAXAMOUNTININT)
  {
    canDlc = 2;
    return canDlc;
  }
  else if (value >= MAXAMOUNTININT && value < MAXAMOUNTINLONG)
  {
    canDlc = 4;
    return canDlc;
  }
  else
  {
    canDlc = 8;
    return canDlc;
  }
}

void fillDataInCANMessage(uint8_t canDlc, uint32_t value)
{
  union MyDatatype data;
  switch (AMOUNTOFBYTESINCAN / canDlc)
  {
  case AMOUNTOFBYTESINCAN:
    data.data_as_unsigned_byte[0] = value; 
    break;
  case AMOUNTOFINTSINCAN:
    data.data_as_unsigned_int[0] = value;
    break;
  case AMOUNTOFLONGSINCAN:
    data.data_as_unsigned_long[0] = value;
    break;
  }
  for (uint8_t byteInCan = 0; byteInCan < canDlc; byteInCan++)
  { 
    CanConfigMsg.data[byteInCan] = data.data_as_unsigned_byte[byteInCan];
  }
}

uint32_t getValue(uint16_t row, uint16_t column)
{
  switch (column)
  {
  case MEASUREUNIT:
    return configTable[row].measureUnit;
    break;

  case CANID:
    return configTable[row].canId;
    break;

  case FREQUENCY:
    return configTable[row].frequency;
    break;

  case RESOLUTION:
    return configTable[row].resolution;
    break;

  case PORT:
    return configTable[row].port;
    break;

  case PORTTYPE:
    return configTable[row].portType;
    break;

  default: 
    return 0;
    break;
  }
}

void clearCANMessage()
{
  for (uint8_t byteInCan = 0; byteInCan < AMOUNTOFBYTESINCAN; byteInCan++)
  { 
    CanConfigMsg.data[byteInCan] = 0;
  }
}
