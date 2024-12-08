#include <SPI.h>
#include <mcp2515.h>

const unsigned int INTERVALCAN = 250;

struct can_frame canMsg;

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
  if(patientCount[machineId] < 8)
  {
    if(machineId == ECGmachine){ 
//      if(canMessages[ECGmachine].data[patientId] == 0){
      canMessages[ECGmachine].data[patientId] = map(data2, 1, 1000, 1, 255); // Has to be mapped, else the values will be too high.
      patientCount[ECGmachine]++;
//      }
    } else {
      canMessages[machineId].data[patientId] = (byte)data2;
      patientCount[machineId]++;
    }
  }

  /* TODO: Werkt nog niet helemaal! Alleen bij machine 0 is de patientcount soms 100 of 50 :/. */
//  if(patientCount[machineId] >= 8){
//    if(machineId == ECGmachine){
//      Serial.print("PatientCount > 8: ");
//      Serial.println(patientCount[machineId]);
//    }
//    readyToSend[machineId] = true;
//  }

}

void canSend() {
  unsigned long currentMillis = millis();
  for (int i = 0; i < DIFFERENTMACHINEAMOUNT; i++){
   if (currentMillis - prevMillisCAN[i] >= INTERVALCAN  || readyToSend[i]) {
    if(checkForValues(i)){
    mcp2515.sendMessage(&canMessages[i]);
//    Serial.println("send");
    }
    patientCount[i] = 0;
    readyToSend[i] = false;
    resetMessage(i);
    prevMillisCAN[i] = millis();
    }
  }

}

bool checkForValues(byte machineId){
  for(int i = 0; i < 8; i++){
    if(canMessages[machineId].data[i] != 0){
      return true;
    }
  }
  return false;
}

void resetMessage(byte machineId){
  for(int i = 0; i < 8; i++){
    canMessages[machineId].data[i] = 0;
  }
}
