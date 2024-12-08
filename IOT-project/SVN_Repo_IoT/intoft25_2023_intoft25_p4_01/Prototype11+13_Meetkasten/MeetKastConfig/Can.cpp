#include "Can.h"
#include "debug.h"
#include "Buffer.h"

extern CanBuffer canBuffer;

MCP2515 mcp2515(10);

// measurement canmsg
struct can_frame CanMeasurementMsg;

// config canmsg
struct can_frame CanConfigMsg;

// stopconfig canmsg
struct can_frame CanStopMsg;

// a array from sensor struct CAN-id, Frequentie, Resolutie, Poort and Porttype
Sensor configTable[AMOUNTOFMAXDATAROWS];

// A table that checks if every config has been set in the table. The reason why i do +1 so i can check if the row has been setup or not.
bool configTableReady[AMOUNTOFMAXDATAROWS][AMOUNTOFCONFIGVALUES + 1];

// A boolean that is true when the config has been configured.
bool configured = false;

// We need a global variable that indicates how much configs is going to be send. This data is going to be send throught the can bus with id 0.
uint16_t amountOfDataRows = 0;

void canSetup()
{
  mcp2515.reset();
  mcp2515.setBitrate(CAN_125KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
}

void readConfigCan()
{
  sendStopMessage();
  if (mcp2515.readMessage(&CanConfigMsg) == MCP2515::ERROR_OK)
  {
    if (!check29BitsIdentifier(&CanConfigMsg)) {
      union ConfigCantype data;
      for (uint8_t bytesInMessage = 0; bytesInMessage < CanConfigMsg.can_dlc; bytesInMessage++)
      {
        data.data_as_bytes[bytesInMessage] = CanConfigMsg.data[bytesInMessage];
      }

      //check if the amountofdatarows message has been send by checking if id is 0.
      if (CanConfigMsg.can_id == 0)
      {
        //Serial.println("STOP MESSAGE");
        amountOfDataRows = processConfigData(data, CanConfigMsg.can_dlc);
        printCanMessage(&CanConfigMsg);
        sendStopMessage();
        return;
      }

      // because we have amountofdatarowsconfig as id 0, the other config can ids should be -1 for the working of our can ids.
      CanConfigMsg.can_id = CanConfigMsg.can_id - 1;
      printCanMessage(&CanConfigMsg);

      sortData(processConfigData(data, CanConfigMsg.can_dlc), CanConfigMsg.can_id);
      Serial.println("Data sorted");
      configTableReady[getRowId(CanConfigMsg.can_id)][getColumnId(CanConfigMsg.can_id)] = true;
    }
  }
}

void sendStopMessage()
{
  // send only if the table has been configured and if its not already has been send.
  if (checkTableConfigured() && !configured && (amountOfDataRows != 0))
  {
    // make the can id the measure unit id, but as a 29 bit message.
    CanStopMsg.can_id = MEASUREUNITID | CAN_EFF_FLAG;
    CanStopMsg.can_dlc = 1;
    CanStopMsg.data[0] = 0;
    mcp2515.sendMessage(&CanStopMsg);
    printConfigTable();
    printString("STOP SENDING MESSAGE", true);
    printCanMessage(&CanStopMsg);
    resetCanMessage(&CanStopMsg);
    configured = true;
  }
}

void sortData(uint64_t data, uint32_t canMessageId)
{
  printString("DATA : ", false);
  switch (getColumnId(canMessageId))
  {
    case MEASUREUNIT:
      configTable[getRowId(canMessageId)].measureUnit = data;
      printString("MEASUREUNIT", false);
      break;
    case CANID :
      configTable[getRowId(canMessageId)].canId = data;
      printString("CANID", false);
      break;
    case FREQUENCY :
      configTable[getRowId(canMessageId)].frequency = data;
      printString("FREQUENTIE", false);
      break;
    case RESOLUTION :
      configTable[getRowId(canMessageId)].resolution = data;
      printString("RESOLUTIE", false);
      break;
    case PORT :
      configTable[getRowId(canMessageId)].port = data;
      printString("POORT", false);
      break;
    case PORTTYPE :
      // check if data is 1 or 0. if 1 its digital else 0 is analog.
      if (data)
      {
        configTable[getRowId(canMessageId)].portType = PORTTYPE_DIGITAL;
      }
      else
      {
        configTable[getRowId(canMessageId)].portType = PORTTYPE_ANALOG;
      }
      printString("PORTTYPE", false);
      break;
  }
  printString("", true);
}

void setupSensor(uint32_t row)
{
  pinMode(INPUT, configTable[row].port);
  configTableReady[row][AMOUNTOFCONFIGVALUES] = true;
}

uint64_t currentMillis = 0;

void sendMeasurements()
{
  currentMillis =  millis();
  if (configured)
  {
    for (uint32_t row = 0 ; row < amountOfDataRows ; row++)
    {
      // check in the configtable if the configuration is for this measureunit. if not, skip this row.
      if (configTable[row].measureUnit != MEASUREUNITID)
      {
       // printString("NOT FOR THIS MEASURE UNIT ", true);
      } else if (!configTableReady[row][AMOUNTOFCONFIGVALUES]) // check if the config has been setup or not. otherwise set it up.
      {
        setupSensor(row);
        printString("SETTING UP", true);
      }
      else
      {
        setupMeasurementCanMessage(row);
//        printString("SENDING", true);
      }
    }
    sendCanMessages();
  }
}

void setupMeasurementCanMessage(uint32_t row)
{
  if (currentMillis - configTable[row].previousMillis > configTable[row].frequency)
  {
    configTable[row].previousMillis = currentMillis;
    uint32_t readData = 0;
    if (configTable[row].portType == PORTTYPE_DIGITAL)
    {
      // we are using mockdata right now so this code is getting commented out. In real production u should use this function and comment out the mock part.
      //readData = digitalRead(configTable[row].port);

      // this is for mock only.
      switch (configTable[row].port)
      {
        case 1:
        case 7:
          readData = random(8, 11);
          break;
        case 2:
        case 8:
          readData = random(1, 5);
          break;
        case 3:
        case 9:
          readData = random(80, 120);
          break;
        case 4:
        case 10:
          readData = random(60, 90);
          break;
        case 5:
        case 11:
          readData = random(60, 220);
          break;
        case 6:
        case 12:
          readData = random(65, 100);
          break;
        default:
          readData = 0;
          break;
      }
    }
    else if (configTable[row].portType == PORTTYPE_ANALOG)
    {
      readData = analogRead(configTable[row].port);
    }
    CanMeasurementMsg.can_id = configTable[row].canId | CAN_EFF_FLAG;
    CanMeasurementMsg.can_dlc = configTable[row].resolution;
    union ConfigCantype data;
    switch (AMOUNTOFBYTESINCAN / configTable[row].resolution)
    {
      case AMOUNTOFBYTESINCAN:
        data.data_as_bytes[0] = readData;
        break;
      case AMOUNTOFWORDINCAN:
        data.data_as_unsigned_int[0] = readData;
        break;
      case AMOUNTOFLONGINCAN:
        data.data_as_unsigned_long[0] = readData;
        break;
      case AMOUNTOFLONGLONGINCAN:
        data.data_as_unsigned_long_long = readData;
        break;
      default:
        data.data_as_unsigned_long_long = readData;
        break;
    }
    for (uint8_t bytesInMessage = 0; bytesInMessage < configTable[row].resolution; bytesInMessage++)
    {
      CanMeasurementMsg.data[bytesInMessage] =  data.data_as_bytes[bytesInMessage];
    }
    bufferAdd(&canBuffer, CanMeasurementMsg);
    printCanMessage(&CanMeasurementMsg);
    resetCanMessage(&CanMeasurementMsg);
  }
}

void sendCanMessages() {
  while (!bufferIsEmpty(&canBuffer)) { 
    can_frame Message = getFromBuffer(&canBuffer);
    if (mcp2515.sendMessage(&Message) != MCP2515::ERROR_OK) {
      bufferAdd(&canBuffer, Message);
    }
  }
}

// check if the table has been fully configured.
bool checkTableConfigured()
{
  if (amountOfDataRows == 0)
  {
    return false;
  }
  for (uint32_t row = 0 ; row < amountOfDataRows ; row++)
  {
    for (uint32_t column = 0 ; column < AMOUNTOFCONFIGVALUES; column++)
    {
      if (!configTableReady[row][column])
      {
        return false;
      }
    }
  }
  return true;
}

void resetCanMessage(struct can_frame *frame)
{
  frame->can_id = 0;
  frame->can_dlc = 1;
  for (uint8_t canLength = 0 ; canLength < AMOUNTOFBYTESINCAN ; canLength++)
  {
    frame->data[canLength] = 0;
  }
}

void printCanMessage(const struct can_frame *frame)
{
  if (debug) {
    Serial.print("ID: ");
    Serial.print((frame->can_id) & ~CAN_EFF_FLAG); // print CAN_ID
    Serial.print(" ");
    Serial.print("Byte Amount: ");
    Serial.print(frame->can_dlc, DEC); // print CAN_DLC (amount of data characters/bits)
    Serial.print(" ");
    for (uint8_t bytesInMessage = 0; bytesInMessage < frame->can_dlc; bytesInMessage++)  {  // print all CAN_msg.data[] values
      Serial.print("  -  Data ");
      Serial.print(bytesInMessage);
      Serial.print(": ");
      Serial.print(frame->data[bytesInMessage], DEC); // Will print 208 when overflow happens
    }
    Serial.println();
  }
}


// only for test purposes.
void printConfigTable()
{
  if (debug) {
    for (uint32_t i = 0 ; i < amountOfDataRows ; i++)
    {
      Serial.print("MeasureUnit-ID: ");
      Serial.print(configTable[i].measureUnit);
      Serial.print("  -  CAN-ID: ");
      Serial.print(configTable[i].canId);
      Serial.print("  -  Frequentie: ");
      Serial.print(configTable[i].frequency);
      Serial.print("  -  Resolutie: ");
      Serial.print(configTable[i].resolution);
      Serial.print("  -  Poort: ");
      Serial.print(configTable[i].port);
      Serial.print("  -  PoortType: ");
      Serial.print(configTable[i].portType);
      Serial.println();
    }
  }
}

// only for test purposes.
void mockData()
{
  // mockdata for amountofconfigvalues we are using for this mocktest.
  CanConfigMsg.can_id = 0;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 2;
  readConfigCan();

  // mockdata 1
  CanConfigMsg.can_id = 1;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 1;
  readConfigCan();

  CanConfigMsg.can_id = 2;
  CanConfigMsg.can_dlc = 2;
  CanConfigMsg.data[0] = 57;
  CanConfigMsg.data[1] = 8;
  readConfigCan();

  CanConfigMsg.can_id = 3;
  CanConfigMsg.can_dlc = 2;
  CanConfigMsg.data[0] = 44;
  CanConfigMsg.data[1] = 1;
  readConfigCan();

  CanConfigMsg.can_id = 4;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 4;
  readConfigCan();

  CanConfigMsg.can_id = 5;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 0;
  readConfigCan();

  CanConfigMsg.can_id = 6;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 0;
  readConfigCan();


  // mockdata 2

  CanConfigMsg.can_id = 7;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 1;
  readConfigCan();

  CanConfigMsg.can_id = 8;
  CanConfigMsg.can_dlc = 2;
  CanConfigMsg.data[0] = 58;
  CanConfigMsg.data[1] = 8;
  readConfigCan();

  CanConfigMsg.can_id = 9;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 150;
  readConfigCan();

  CanConfigMsg.can_id = 10;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 2;
  readConfigCan();


  CanConfigMsg.can_id = 11;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 6;
  readConfigCan();

  CanConfigMsg.can_id = 12;
  CanConfigMsg.can_dlc = 1;
  CanConfigMsg.data[0] = 1;
  readConfigCan();

  readConfigCan();
}

bool check29BitsIdentifier(const struct can_frame *frame) {
  if (frame->can_id & CAN_EFF_FLAG) {
    return true;
  } else {
    return false;
  }
}
