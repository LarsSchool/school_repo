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
//SoftwareSerial reader1 =  SoftwareSerial(rxPin1, txPin1);
//SoftwareSerial reader2 =  SoftwareSerial(rxPin2, txPin2);
//SoftwareSerial reader3 =  SoftwareSerial(rxPin3, txPin3);
////SoftwareSerial reader4 =  SoftwareSerial(rxPin4, txPin4);
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
//  reader1.begin(9600);
//  reader2.begin(9600);
//  reader3.begin(9600);
////  reader4.begin(9600);
//  reader1.listen();
//}
//
//void readSoftSerial()
//{
//    delay(500);
//    if (reader1.available() > 0) {      
//      byte value = reader1.read();
//      if(value != 0){
//        Serial.println("id1:");
//        Serial.println(value);
//        reader2.listen();
//      }
//    }
//    if (reader2.available() > 0) {
//      byte value = reader2.read();
//      if(value != 0){
//        Serial.println("id2:");
//        Serial.println(value);
//        reader3.listen();
//      }
//    }
//    if (reader3.available() > 0) {
//      byte value = reader3.read();
//      if(value != 0){
//        Serial.println("id3:");
//        Serial.println(value);
//        reader1.listen();
//      }
//    }
////    if (reader4.available() > 0) {
////      byte value = reader4.read();
////      if(value != 0){
////        Serial.println("id4:");
////        Serial.println(value);
////        reader1.listen();
////      }
////    }
//}
