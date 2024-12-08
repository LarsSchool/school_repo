#include <SPI.h>
#include <mcp2515.h>

const unsigned int INTERVALCAN = 2000;
unsigned long prevMillisCan = 0;

struct can_frame canMsg1;
unsigned short canDLC = 0;

unsigned short numberOfReceivedData = 0;
unsigned short CANArray[8];

unsigned short cholesterol = 4;
unsigned short hemoglobine = 9;
unsigned short onderdruk = 90;
unsigned short bovendruk = 120;

unsigned short counter = 0;
bool ready = true;

MCP2515 mcp2515(10);

void canSetup() {
  canMsg1.can_id  = 0;
  //  canMsg1.data[0] = cholesterol;
  //  canMsg1.data[1] = hemoglobine;
  //  canMsg1.data[2] = onderdruk;
  //  canMsg1.data[3] = bovendruk;
  //  canMsg1.data[4] = 2000;
  //  canMsg1.data[5] = 15;
  //  canMsg1.data[6] = 10;
  //  canMsg1.data[7] = 2000;

  mcp2515.reset();
  mcp2515.setBitrate(CAN_125KBPS, MCP_8MHZ);
  mcp2515.setNormalMode();
  Serial.println("Example: Write to CAN");
}

void addDataToArray(unsigned short data){
  CANArray[numberOfReceivedData] = data;
  numberOfReceivedData++;
}

//void addDataToByte1(unsigned short data)
//{
//  canMsg1.data[0] = data;
//  canDLC++;
//}
//
//void addDataToByte2(unsigned short data)
//{
//  canMsg1.data[1] = data;
//  canDLC++;
//}
//void addDataToByte3(unsigned short data)
//{
//  canMsg1.data[2] = data;
//  canDLC++;
//}
//void addDataToByte4(unsigned short data)
//{
//  canMsg1.data[3] = data;
//  canDLC++;
//}
//void addDataToByte5(unsigned short data)
//{
//  canMsg1.data[4] = data;
//  canDLC++;
//}
//void addDataToByte6(unsigned short data)
//{
//  canMsg1.data[5] = data;
//  canDLC++;
//}
//void addDataToByte7(unsigned short data)
//{
//  canMsg1.data[6] = data;
//  canDLC++;
//}
//void addDataToByte8(unsigned short data)
//{
//  canMsg1.data[7] = data;
//  canDLC++;
//}

void fillCANDataFrame(){
  for(int i = 0; i < numberOfReceivedData; i++){
    canMsg1.data[i] = CANArray[i];
    canDLC++;
  }
}


void canSend() {
  ready = true;
    
  addDataToArray(cholesterol);
  addDataToArray(hemoglobine);
  addDataToArray(onderdruk);
  addDataToArray(bovendruk);
  fillCANDataFrame();
  
  unsigned long currentMillis = millis();
  if (currentMillis - prevMillisCan >= INTERVALCAN && ready) {
    canMsg1.can_dlc = canDLC;
    mcp2515.sendMessage(&canMsg1);
    Serial.println("send");
    Serial.println(canMsg1.data[0]);
    Serial.println(canMsg1.data[1]);
    Serial.println(canMsg1.data[2]);
    Serial.println(canMsg1.data[3]);
    prevMillisCan = currentMillis;
    ready = false;
  }
  canDLC = 0;
  numberOfReceivedData = 0;
}
