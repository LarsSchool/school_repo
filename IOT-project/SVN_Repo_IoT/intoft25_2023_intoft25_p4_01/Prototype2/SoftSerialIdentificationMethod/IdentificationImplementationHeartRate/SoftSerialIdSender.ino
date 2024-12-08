//#include <SoftwareSerial.h>
//
//#define rxPin 2
//#define txPin 3
//#define rxPin2 4
//#define txPin2 5
//
// SoftwareSerial idReader =  SoftwareSerial(rxPin, txPin);
// SoftwareSerial dataReader =  SoftwareSerial(rxPin2, txPin2);
//
// bool writeOrRead = true;
// byte faseHandShake = 0;
// byte id;
// byte machineId;
// int potmeter = A2;
//
//// minimale en maximale waarde voor een potmeter
// const int MINPOTVALUE = 0;
// const int MAXPOTVALUE = 1023;
//
//// minimale en maximale hartslag
// const int MINOUTPUTVALUE = 50;
// const int MAXOUTPUTVALUE = 180;
//
// void SoftSerialSetup()
//{
//  pinMode(rxPin, INPUT);
//  pinMode(txPin, OUTPUT);
//  pinMode(rxPin2, INPUT);
//  pinMode(txPin2, OUTPUT);
//  id = 0;
//  machineId = 0;
//  dataReader.begin(9600);
//  idReader.begin(9600);
//}
//
//
//
// void mockData()
//{
////  byte cholesterol = random(1, 5);
////  sendData(10,cholesterol);
////  byte hemoglobine = random(8, 11);
////  sendData(20,hemoglobine);
////  byte bovendruk = random(80, 120);
////  sendData(30,bovendruk);
////  byte onderdruk = random(60, 90);
////  sendData(40,onderdruk);
////  sendData(50,onderdruk);
////  sendData(60,onderdruk);
////  sendData(70,onderdruk);
////  sendData(80,onderdruk);
////  sendData(90,onderdruk);
////  sendData(100,onderdruk);
////  sendData(115,onderdruk);
////  sendData(125,onderdruk);
////  sendData(135,onderdruk);
////  sendData(135,onderdruk);
////  sendData(145,onderdruk);
////  sendData(155,onderdruk);
////  sendData(165,onderdruk);
//  byte hartslag = mockHeartRate();
//  sendData(55, hartslag);
//}
//
// byte mockHeartRate() {
//  int potValue = analogRead(potmeter);
//  byte hartslag = map(potValue, MINPOTVALUE, MAXPOTVALUE, MINOUTPUTVALUE,
//  MAXOUTPUTVALUE);
//
//  return hartslag;
//}
//
// void sendData(byte id, byte data)
//{
//  readAndSendSoftSerial(id,data); // stuur eerst de id.
//  while(faseHandShake != 0) // blijf de functie aanroepen totdat die klaar is
//  en gereset, volgende data kan worden verzonden.
//  {
//    readAndSendSoftSerial(id,data);
//  }
//}
//
// void readAndSendSoftSerial(byte id, byte data)
//{
//  if(!faseHandShake) // eerste fase, stuur de id.
//  {
//      idReader.write(id);
//      Serial.println("sturen");
//      faseHandShake++;
//  }
//  else if(faseHandShake == 1 && idReader.available() > 0) // tweede fase check
//  eerst of je een response hebt gekregen.
//  {
//    byte dataRead = idReader.read();
//    if(dataRead == 1) // de id is goed ontvangen stuur de data.
//    {
//      dataReader.listen();
//      Serial.println("data sturen");
//      dataReader.write(data);
//      faseHandShake++;
//    }
//    else if(dataRead == 2) // de id is niet goed ontvangen begin weer vanaf
//    het begin.
//    {
//      faseHandShake = 0;
//      Serial.println("mislukt");
//    }
//  }
//  else if(faseHandShake == 2 && dataReader.available() > 0) // check of de
//  data goed is aangekomen.
//  {
//    byte dataRead = dataReader.read();
//    if(dataRead == 1) // goed aangekomen, start weer opnieuw.
//    {
//      idReader.listen();
//      Serial.println("reset");
//      faseHandShake = 0;
//    }
//    else if( dataRead == 2) // niet goed aangekomen, start opnieuw.
//    {
//      idReader.listen();
//      Serial.println("reset failed");
//      faseHandShake = 0;
//    }
//  }
//}
