// #include <mcp2515.h>
#include "CanConfigSend.h"
#include "CanConfigRead.h"
#include "Debug.h"

MCP2515 mcp2515(5);  // Has to be something outside of 6-11
struct can_frame CanMsg;

Sensor configTable[ROWS];

uint32_t arrayRow = 0;
uint32_t arrayCollumn = 0;
uint32_t canId = 1;

uint64_t previousMillis;
uint64_t currentMillis = 0;

uint32_t getAmountOfCanMessages() {
  return AMOUNTOFCONFIGVALUES * AMOUNTOFDATA * AMOUNTOFPATIENTS;
}

void printValues() {
  if (debug) {
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

void canSetup() {
  mcp2515.reset();
  mcp2515.setBitrate(CAN_1000KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
}

void addDataToTable(uint8_t measureUnit, uint32_t canID, uint32_t frequency, uint32_t resolution, uint32_t port, PortType portType, Machine machine) {
  if (arrayRow < ROWS) {
    configTable[arrayRow].measureUnit = measureUnit;
    configTable[arrayRow].canId = canID;
    configTable[arrayRow].frequency = frequency;
    configTable[arrayRow].resolution = resolution;
    configTable[arrayRow].port = port;
    configTable[arrayRow].portType = portType;
    configTable[arrayRow].machine = machine;
    arrayRow++;
  }
}

void fillTable() {
  // Meetkast, CAN-id, Frequentie, Resolutie, Poort, Poorttype (D of A), Soort gegeven
  addDataToTable(1, (1 + startID29Bit), 11, 4, 0, ANALOG_PORT, ECG);                 // ECG P1
  addDataToTable(1, (3 + startID29Bit), 501, 1, 1, DIGITAL_PORT, HEMOGLOBIN);        // Hemoglobine P1
  addDataToTable(1, (4 + startID29Bit), 502, 1, 2, DIGITAL_PORT, CHOLESTEROL);       // Cholesterol P1
  addDataToTable(1, (5 + startID29Bit), 503, 1, 3, DIGITAL_PORT, UPPERPRESSURE);     // Bovendruk P1
  addDataToTable(1, (6 + startID29Bit), 504, 1, 4, DIGITAL_PORT, NEGATIVEPRESSURE);  // Onderdruk P1
  addDataToTable(1, (7 + startID29Bit), 205, 1, 1, ANALOG_PORT, HEARTBEAT);          // Hartslag P1
  addDataToTable(1, (8 + startID29Bit), 206, 1, 2, ANALOG_PORT, OXYGENLEVEL);        // PID P1

  addDataToTable(2, (2+startID29Bit), 12, 4, 0 , ANALOG_PORT, ECG); // ECG P2
  addDataToTable(2, (9+startID29Bit), 507, 1, 1, DIGITAL_PORT, HEMOGLOBIN); // Hemoglobine P2
  addDataToTable(2, (10+startID29Bit), 508, 1, 2, DIGITAL_PORT, CHOLESTEROL); // Cholesterol P1
  addDataToTable(2, (11+startID29Bit), 509, 1, 3, DIGITAL_PORT, UPPERPRESSURE);  // Bovendruk P1
  addDataToTable(2, (12+startID29Bit), 510, 1, 4, DIGITAL_PORT, NEGATIVEPRESSURE);  // Onderdruk P1
  addDataToTable(2, (13+startID29Bit), 211, 1, 1, ANALOG_PORT, HEARTBEAT);  // Hartslag P1
  addDataToTable(2, (14+startID29Bit), 212, 1, 2, ANALOG_PORT, OXYGENLEVEL);  // PID P1
}

void sendConfig() {
  if (!getConfigComplete()) {
    currentMillis = millis();

    if (currentMillis - previousMillis >= INTERVAL) {
      if (canId - 1 == 0) {
        sendConfigRows();
      }
      previousMillis = currentMillis;

      CanMsg.can_id = canId;
      CanMsg.can_dlc = calculateCANdlc(arrayRow, arrayCollumn);
      fillDataInCANMessage(CanMsg.can_dlc, getValue(arrayRow, arrayCollumn));
      mcp2515.sendMessage(&CanMsg);
      if (debug) {
        Serial.print("CAN-id : ");
        Serial.println(canId);
        Serial.print("CANdlc = ");
        Serial.println(CanMsg.can_dlc);
        for (uint8_t byteNr = 0; byteNr < CanMsg.can_dlc; byteNr++) {
          Serial.print(" Byte ");
          Serial.print(byteNr);
          Serial.print(" : ");
          Serial.println(CanMsg.data[byteNr]);
        }
        Serial.println("Message Sent");
      }

      canId++;
      arrayCollumn++;

      if (arrayCollumn % AMOUNTOFCONFIGVALUES == 0) {
        arrayRow++;
        arrayCollumn = 0;
      }
    }
    clearCANMessage();
  }
  if (arrayRow == ROWS + 1) {
    resetConfig();
  }
}

void sendConfigRows() {
  CanMsg.can_id = 0;
  CanMsg.can_dlc = 4;
  fillDataInCANMessage(CanMsg.can_dlc, ROWS);
  mcp2515.sendMessage(&CanMsg);
  if (debug) {
    Serial.print("CAN-id-Rows : ");
    Serial.println(CanMsg.can_id);
    Serial.print("CANdlc = ");
    Serial.println(CanMsg.can_dlc);
    for (uint8_t byteNr = 0; byteNr < CanMsg.can_dlc; byteNr++) {
      Serial.print(" Byte ");
      Serial.print(byteNr);
      Serial.print(" : ");
      Serial.println(CanMsg.data[byteNr]);
    }
    Serial.println("Message Sent");
  }

  clearCANMessage();
}

void resetConfig() {
  arrayRow = 0;
  arrayCollumn = 0;
  canId = 1;
}

uint8_t calculateCANdlc(uint16_t row, uint16_t column) {
  uint64_t value = getValue(row, column);
  uint8_t canDlc;
  if (value < MAXAMOUNTINBYTE) {
    canDlc = 1;
    return canDlc;
  } else if (value >= MAXAMOUNTINBYTE && value < MAXAMOUNTININT) {
    canDlc = 2;
    return canDlc;
  } else if (value >= MAXAMOUNTININT && value < MAXAMOUNTINLONG) {
    canDlc = 4;
    return canDlc;
  } else {
    canDlc = 8;
    return canDlc;
  }
}

void fillDataInCANMessage(uint8_t canDlc, uint32_t value) {
  union MyDatatype data;
  switch (AMOUNTOFBYTESINCAN / canDlc) {
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
  for (uint8_t byteInCan = 0; byteInCan < canDlc; byteInCan++) {
    CanMsg.data[byteInCan] = data.data_as_unsigned_byte[byteInCan];
  }
}

uint32_t getValue(uint16_t row, uint16_t column) {
  switch (column) {
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

void clearCANMessage() {
  for (uint8_t byteInCan = 0; byteInCan < AMOUNTOFBYTESINCAN; byteInCan++) {
    CanMsg.data[byteInCan] = 0;
  }
}

void testCAN() {
  CanMsg.can_id = 12;
  CanMsg.can_dlc = 4;
  CanMsg.data[0] = 1;
  CanMsg.data[1] = 2;
  CanMsg.data[2] = 3;
  CanMsg.data[3] = 4;

  /* send out the message to the bus and
  tell other devices this is a standard frame from 0x00. */
  mcp2515.sendMessage(&CanMsg);
}
