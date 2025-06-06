#include "Can.h"
#include "debug.h"

MCP2515 mcp2515(10);

// measurement canmsg
struct can_frame canMeasurementMsg;

// config canmsg
struct can_frame canConfigMsg;

// stopconfig canmsg
struct can_frame canStopMsg;

// a array from sensor struct CAN-id, Frequentie, Resolutie, Poort and Porttype
Sensor configTable[AMOUNTOFDATAROWS];

// A table that checks if every config has been set in the table. The reason why i do +1 so i can check if the row has been setup or not.
bool configTableReady[AMOUNTOFDATAROWS][AMOUNTOFCONFIGVALUES+1];

// A boolean that is true when the config has been configured. 
bool configured = false;

void canSetup()
{
  mcp2515.reset();
  mcp2515.setBitrate(CAN_125KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
}

void readConfigCan()
{   
    if(checkTableConfigured() && !configured)
    {
      canStopMsg.can_id = 0;
      canStopMsg.can_dlc = 0;
      canStopMsg.data[0] = 0;
      mcp2515.sendMessage(&canStopMsg);
      printConfigTable();
      resetCanMessage(&canStopMsg);
      configured = true;
      printString("STOP SENDING MESSAGE", true);
    }
    
    if (mcp2515.readMessage(&canConfigMsg) == MCP2515::ERROR_OK) 
    {
        // check if the can message is higher then 11 bits, if so its a meassurement message not a config message do a early return. 
        if(canConfigMsg.can_id > MAX11BITVALUE)
        {
          printString("Not for this unit", true);
          return;
        }
        // because we want to have the stop message the highest priority, the config can ids should be -1 for the working of our can ids.
        canConfigMsg.can_id = canConfigMsg.can_id-1;
        printCanMessage(&canConfigMsg);
        union ConfigCantype data;
        for (uint8_t bytesInMessage = 0; bytesInMessage < canConfigMsg.can_dlc; bytesInMessage++)  
        { 
            data.data_as_bytes[bytesInMessage] = canConfigMsg.data[bytesInMessage];
        }
        sortData(processConfigData(data, canConfigMsg.can_dlc), canConfigMsg.can_id);
        configTableReady[getRowId(canConfigMsg.can_id)][getColumnId(canConfigMsg.can_id)] = true;
    }
}

void sortData(uint64_t data, uint32_t canMessageId)
{
  printString("DATA : ", false);
  switch(getColumnId(canMessageId))
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
      if(data)
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
  //Serial.println(configured);
  if(configured)
  {
      for(uint32_t row = 0 ; row < AMOUNTOFDATAROWS ; row++)
        {
          // check in the configtable if the configuration is for this measureunit. if not, skip this row.
          if(configTable[row].measureUnit != MEASUREUNITID)
          {
            break;
          }
          // check if the config has been setup or not. otherwise set it up. 
          if(!configTableReady[row][AMOUNTOFCONFIGVALUES ])
          {
            setupSensor(row);
          }
          else
          {
            setupMeasurementCanMessage(row);
          }
        }
  }
}

void setupMeasurementCanMessage(uint32_t row)
{
  if(currentMillis - configTable[row].previousMillis > configTable[row].frequency)
  {
    configTable[row].previousMillis = currentMillis;
    uint32_t readData = 0;
    if(configTable[row].portType == PORTTYPE_DIGITAL)
    {
      // we are using mockdata right now so this code is getting commented out. In real production u should use this function and comment out the mock part.
      //readData = digitalRead(configTable[row].port);

      // this is for mock only.
      switch(configTable[row].port)
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
    else if(configTable[row].portType == PORTTYPE_ANALOG)
    {
      readData = analogRead(configTable[row].port);
    }
    canMeasurementMsg.can_id = configTable[row].canId | CAN_EFF_FLAG;
    canMeasurementMsg.can_dlc = configTable[row].resolution;
    union ConfigCantype data;
    switch(AMOUNTOFBYTESINCAN/configTable[row].resolution)
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
      canMeasurementMsg.data[bytesInMessage] =  data.data_as_bytes[bytesInMessage];
    }
    mcp2515.sendMessage(&canMeasurementMsg);
    printCanMessage(&canMeasurementMsg);
    resetCanMessage(&canMeasurementMsg);
  }  
}

// check if the table has been fully configured. 
bool checkTableConfigured()
{
  for(uint32_t row = 0 ; row < AMOUNTOFDATAROWS ; row++)
  {
    for(uint32_t column = 0 ; column < AMOUNTOFCONFIGVALUES; column++)
    {
      if(!configTableReady[row][column])
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
  frame->can_dlc = 0;
  for(uint8_t canLength = 0 ; canLength < AMOUNTOFBYTESINCAN ; canLength++)
  {
    frame->data[canLength] = 0;
  }
}

void printCanMessage(const struct can_frame *frame)
{
  if(debug){
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
    Serial.print(frame->data[bytesInMessage],DEC); // Will print 208 when overflow happens
    }
    Serial.println();
  }
}


// only for test purposes.
void printConfigTable()
{
  if(debug){
    for(uint32_t i = 0 ; i < AMOUNTOFDATAROWS ; i++)
    {
        Serial.print("CAN-ID: ");
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

// mockdata 1
  canConfigMsg.can_id = 1;
  canConfigMsg.can_dlc = 1;
  canConfigMsg.data[0] = 1;
  readConfigCan();
  
  canConfigMsg.can_id = 2;
  canConfigMsg.can_dlc = 2;
  canConfigMsg.data[0] = 57;
  canConfigMsg.data[1] = 8;
  readConfigCan();
  
  canConfigMsg.can_id = 3;
  canConfigMsg.can_dlc = 2;
  canConfigMsg.data[0] = 44;
  canConfigMsg.data[1] = 1;
  readConfigCan();
  
  canConfigMsg.can_id = 4;
  canConfigMsg.can_dlc = 1;
  canConfigMsg.data[0] = 4;
  readConfigCan();

  canConfigMsg.can_id = 5;
  canConfigMsg.can_dlc = 1;
  canConfigMsg.data[0] = 0;
  readConfigCan();

  canConfigMsg.can_id = 6;
  canConfigMsg.can_dlc = 1;
  canConfigMsg.data[0] = 0;
  readConfigCan();


// mockdata 2
  
  canConfigMsg.can_id = 7;
  canConfigMsg.can_dlc = 1;
  canConfigMsg.data[0] = 1;
  readConfigCan();
  
  canConfigMsg.can_id = 8;
  canConfigMsg.can_dlc = 2;
  canConfigMsg.data[0] = 58;
  canConfigMsg.data[1] = 8;
  readConfigCan();
  
  canConfigMsg.can_id = 9;
  canConfigMsg.can_dlc = 1;
  canConfigMsg.data[0] = 150;
  readConfigCan();
  
  canConfigMsg.can_id = 10;
  canConfigMsg.can_dlc = 1;
  canConfigMsg.data[0] = 2;
  readConfigCan();


  canConfigMsg.can_id = 11;
  canConfigMsg.can_dlc = 1;
  canConfigMsg.data[0] = 6;
  readConfigCan();

  canConfigMsg.can_id = 12;
  canConfigMsg.can_dlc = 1;
  canConfigMsg.data[0] = 1;
  readConfigCan();
  
  readConfigCan();
}
