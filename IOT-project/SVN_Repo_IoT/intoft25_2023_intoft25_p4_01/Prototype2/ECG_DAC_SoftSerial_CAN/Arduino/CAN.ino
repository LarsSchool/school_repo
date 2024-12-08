#include <SPI.h>
#include <mcp2515.h>

const unsigned int INTERVALCAN = 150;
const byte DIFFERENTMACHINEAMOUNT = 5;

byte ECGmachine = 0;
struct can_frame canMessages[DIFFERENTMACHINEAMOUNT];
unsigned short patientCount[DIFFERENTMACHINEAMOUNT];
bool readyToSend[DIFFERENTMACHINEAMOUNT];
unsigned long prevMillisCAN[DIFFERENTMACHINEAMOUNT];

MCP2515 mcp2515(10);

void canSetup() {

  for (int i = 0; i < DIFFERENTMACHINEAMOUNT; i++){
      canMessages[i].can_id = i;
      canMessages[i].can_dlc = 8;
      patientCount[i] = 0;
      readyToSend[i] = false;
      prevMillisCAN[i] = 0;
  }
  mcp2515.reset();
  mcp2515.setBitrate(CAN_125KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
//  Serial.println("Example: Write to CAN");
}

void addData(unsigned short data2, byte machineId, byte patientId)
{
  if(patientCount[machineId] < 8 && !readyToSend[machineId])
  {
    if(machineId == ECGmachine){
      canMessages[ECGmachine].data[patientId] = map(data2, 1, 1000, 1, 255); // Has to be mapped, else the values will be too high.
      patientCount[machineId]++;
    } else {
      canMessages[machineId].data[patientId] = data2;
      patientCount[machineId]++;
    }
  }
  if(patientCount[machineId] >= 8){
    readyToSend[machineId] = true;
  }

}

void canSend() {
  unsigned long currentMillis = millis();
  for (int i = 0; i < DIFFERENTMACHINEAMOUNT; i++){
   if (readyToSend[i] || currentMillis - prevMillisCAN[i] >= INTERVALCAN) {
    mcp2515.sendMessage(&canMessages[i]);
//    Serial.println("send");
    prevMillisCAN[i] = currentMillis;
    patientCount[i] = 0;
    readyToSend[i] = false;
    }
  }
}
