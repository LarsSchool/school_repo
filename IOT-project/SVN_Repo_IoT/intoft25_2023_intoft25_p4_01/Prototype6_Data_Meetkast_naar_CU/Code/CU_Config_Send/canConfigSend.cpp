#include <mcp2515.h>
#include "canConfigSend.h"
#include "canConfigRead.h"
#include "debug.h"

MCP2515 mcp2515(2);
struct can_frame CanConfigMsg;

uint16_t arrayRow = 0; 
uint16_t arrayCollumn = 0; 
uint16_t canId = 1;

uint64_t previousMillis;
uint64_t currentMillis;

Sensor configTable[ROWS];

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

void addDataToTable(uint8_t measureUnit, uint32_t CANID, uint32_t frequency, uint32_t resolution, uint32_t port, PortType portType, Machine machine)
{
  if (arrayRow < ROWS)
  {
    configTable[arrayRow].measureUnit = measureUnit;
    configTable[arrayRow].canId = CANID;
    configTable[arrayRow].frequency = frequency;
    configTable[arrayRow].resolution = resolution;
    configTable[arrayRow].port = port;
    configTable[arrayRow].portType = portType;
    configTable[arrayRow].machine = machine;
    arrayRow++;
  }
}

void fillTable()
{
  // Meetkast, CAN-id, Frequentie, Resolutie, Poort, Poorttype (D of A), Machine
  addDataToTable(1, (57+2048), 100, 4, 0, ANALOG_PORT, ECG);  // ECG P1
  addDataToTable(1, (58+2048), 110, 2, 1, DIGITAL_PORT, HEMOGLOBIN);  // Hemoglobine P1
  addDataToTable(1, (59+2048), 120, 2, 2, DIGITAL_PORT, CHOLESTEROL);  // Cholesterol P1
  addDataToTable(1, (60+2048), 130, 2, 3, DIGITAL_PORT, UPPERPRESSURE);  // Bovendruk P1
  addDataToTable(1, (61+2048), 140, 4, 4, DIGITAL_PORT, NEGATIVEPRESSURE);  // Onderdruk P1
  addDataToTable(1, (62+2048), 150, 2, 5, DIGITAL_PORT, HEARTBEAT);  // Hartslag P1
  addDataToTable(1, (63+2048), 160, 1, 6, DIGITAL_PORT, OXYGENLEVEL); // PID P1

  addDataToTable(1, (64+2048), 170, 1, 1 , ANALOG_PORT, ECG); // ECG P2
  addDataToTable(1, (65+2048), 180, 2, 7, DIGITAL_PORT, HEMOGLOBIN); // Hemoglobine P2
  addDataToTable(1, (66+2048), 190, 2, 8, DIGITAL_PORT, CHOLESTEROL); // Cholesterol P1
  addDataToTable(1, (67+2048), 200, 8, 9, DIGITAL_PORT, UPPERPRESSURE);  // Bovendruk P1
  addDataToTable(1, (68+2048), 210, 4, 10, DIGITAL_PORT, NEGATIVEPRESSURE);  // Onderdruk P1
  addDataToTable(1, (69+2048), 220, 2, 11, DIGITAL_PORT, HEARTBEAT);  // Hartslag P1
  addDataToTable(1, (70+2048), 230, 2, 12, DIGITAL_PORT, OXYGENLEVEL);  // PID P1
}

void sendConfig()
{ 
  if (!checkCompletion())
  {
    currentMillis = millis();

    if (currentMillis - previousMillis >= INTERVAL) 
    {
      previousMillis = currentMillis;

      CanConfigMsg.can_id = canId;
      CanConfigMsg.can_dlc = calculateCANdlc(arrayRow, arrayCollumn);
      fillDataInCANMessage(CanConfigMsg.can_dlc, arrayRow, arrayCollumn);
      mcp2515.sendMessage(&CanConfigMsg);
      if(debug){
        Serial.print("CAN-id : ");
        Serial.println(canId);
        Serial.print("CANdlc = ");
        Serial.println(CanConfigMsg.can_dlc);
        for (int i = 0; i < CanConfigMsg.can_dlc; i++) {
          Serial.print(" Byte ");
          Serial.print(i);
          Serial.print(" : ");
          Serial.println(CanConfigMsg.data[i]);
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
  if (arrayRow == ROWS + 1)
  {
    resetConfig();
  }
}

void resetConfig()
{
  arrayRow = 0;
  arrayCollumn = 0;
  canId = 1;
}

uint8_t calculateCANdlc(uint16_t row, uint16_t collumn)
{
  uint64_t value = getValue(row, collumn);
  uint8_t canDlc;
  if (value < MAX_AMOUNT_IN_BYTE)
  {
    canDlc = 1;
    return canDlc;
  }
  else if (value >= MAX_AMOUNT_IN_BYTE && value < MAX_AMOUNT_IN_INT)
  {
    canDlc = 2;
    return canDlc;
  }
  else if (value >= MAX_AMOUNT_IN_INT && value < MAX_AMOUNT_IN_LONG)
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

void fillDataInCANMessage(uint8_t canDlc, uint16_t row, uint16_t collumn)
{
  uint32_t value = getValue(row, collumn);
  union MyDatatype data;
  switch (AMOUNT_OF_BYTES_IN_CAN / canDlc)
  {
  case AMOUNT_OF_BYTES_IN_CAN:
    data.data_as_usingned_byte[0] = value; 
    break;
  case AMOUNT_OF_INTS_IN_CAN:
    data.data_as_unsigned_int[0] = value;
    break;
  case AMOUNT_OF_LONGS_IN_CAN:
    data.data_as_unsigned_long[0] = value;
    break;
  }
  for (int byteInCan = 0; byteInCan < canDlc; byteInCan++)
  { 
    CanConfigMsg.data[byteInCan] = data.data_as_usingned_byte[byteInCan];
  }
}

uint32_t getValue(uint16_t row, uint16_t collumn)
{
  uint32_t value = 0;
  switch (collumn)
  {
  case MEASUREUNIT:
    value = configTable[row].measureUnit;
    break;

  case CANID:
    value = configTable[row].canId;
    break;

  case FREQUENCY:
    value = configTable[row].frequency;
    break;

  case RESOLUTION:
    value = configTable[row].resolution;
    break;

  case PORT:
    value = configTable[row].port;
    break;

  case PORTTYPE:
    value = configTable[row].portType;
    break;
    
  }
  return value;
}

void clearCANMessage()
{
  for (int byteInCan = 0; byteInCan < AMOUNT_OF_BYTES_IN_CAN; byteInCan++)
  { 
    CanConfigMsg.data[byteInCan] = 0;
  }
}
