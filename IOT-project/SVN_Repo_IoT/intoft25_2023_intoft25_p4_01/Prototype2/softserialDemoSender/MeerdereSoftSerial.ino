//#include <SoftwareSerial.h>
//
//#define rxPin1 2
//#define txPin1 3
//#define rxPin2 4
//#define txPin2 5
//#define rxPin3 6
//#define txPin3 7
//#define rxPin4 8
//#define txPin4 9
//
//int dataMock[] = { 0, 1, 2, 3, 4, 5, 6, 7 , 8, 9 , 10};
//int count = 0;
//SoftwareSerial Serial1_1 =  SoftwareSerial(rxPin1, txPin1);
//SoftwareSerial Serial1_2 =  SoftwareSerial(rxPin2, txPin2);
//SoftwareSerial Serial1_3 =  SoftwareSerial(rxPin3, txPin3);
////SoftwareSerial Serial1_4 =  SoftwareSerial(rxPin3, txPin3);
//
//void SoftSerialSetup()
//{
//  pinMode(rxPin1, INPUT);
//  pinMode(txPin1, OUTPUT);
//  pinMode(rxPin2, INPUT);
//  pinMode(txPin2, OUTPUT);
//  pinMode(rxPin3, INPUT);
//  pinMode(txPin3, OUTPUT);
////  pinMode(rxPin4, INPUT);
////  pinMode(txPin4, OUTPUT);
//  Serial1_1.begin(9600);
//  Serial1_2.begin(9600);
//  Serial1_3.begin(9600);
////  Serial1_4.begin(9600);
//
//}
//
//void sendData()
//{
//  Serial1_1.write(dataMock[count]);
//  delay(500);
//  Serial1_2.write(dataMock[count]);
//  delay(500);
//  Serial1_3.write(dataMock[count]);
//  delay(500);
////  Serial1_4.write(dataMock[count]);
//  Serial.print("send, datamock: ");
//  Serial.println(dataMock[count]);
//  count++;
//
//  if(count > 10)
//  {
//    count = 0;
//  }
//}
