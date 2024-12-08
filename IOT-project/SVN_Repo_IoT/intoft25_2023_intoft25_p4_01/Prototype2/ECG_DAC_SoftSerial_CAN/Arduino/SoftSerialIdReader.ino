#include <SoftwareSerial.h>
#include "sharedValues.h"

#define rxPin 2
#define txPin 3
#define rxPin2 4
#define txPin2 5

SoftwareSerial idReader =  SoftwareSerial(rxPin, txPin);
SoftwareSerial dataReader =  SoftwareSerial(rxPin2, txPin2);

unsigned short data[10][25];

byte id;
byte machineId;
byte errorByte = 250;
bool writeOrRead = true; 
byte globalCholesterol;
byte globalHemoglobine;
byte globalBovendruk;
byte globalOnderdruk;
byte globalHartslag;
byte globalZuurstof;

void SoftSerialSetup()
{
 pinMode(rxPin, INPUT);
 pinMode(txPin, OUTPUT);
 pinMode(rxPin2, INPUT);
 pinMode(txPin2, OUTPUT);
 initialiseData();
 id = 0;
 machineId = 0;
 dataReader.begin(9600);
 idReader.begin(9600);
}

void initialiseData()
{
 for(int i = 0 ; i < 10 ; i++)
 {
   for(int j = 0 ; j < 25 ; j ++)
   {
     data[i][j] = 0;
   }
 }
}

unsigned long previousMillis = 0;
const byte RESPONSETIME = 50;

void readAndSendSoftSerial()
{   
   unsigned long currentMillis = millis();
   if (idReader.available() > 0 && writeOrRead) { // check eerst of er een id is verzonden en dat je ook in de lezen state zit.
      byte receivedData = idReader.read();
      id = receivedData % 10;
      machineId = (receivedData-id)/10;
      if(id < 10 && machineId < 25) // De id klopt stuur een goed response en zorg ervoor dat data begint met lezen.
      {
       dataReader.listen();
       idReader.write(id); // Hier wordt patientID teruggestuurd voor extra veiligheid.
       writeOrRead = false;
//       Serial.println("Valid id");
       previousMillis = currentMillis;
      }
      else // Gaat niet goed stuur een 2 om aan te geven dat het niet is gelukt en luister weer naar een id.
      {
//       Serial.println("Reset1");
       idReader.write(2);
       writeOrRead = true;
      }
   }
   else if(currentMillis - previousMillis <= RESPONSETIME) // kijk of het antwoord binnen 50ms binnen komt, anders stuur error response.
     {
       if(dataReader.available() > 0 && !writeOrRead)
       {
           byte receivedData = dataReader.read();      
           data[id][machineId] = receivedData;
//           Serial.print("PatientId: ");
//           Serial.println(id);
//           Serial.print("Machine: " );
//           Serial.println(machineId);
          //  Serial.print(machineId);
          //  Serial.print(": ");
          //  Serial.print(receivedData);
           idReader.listen(); 
           writeOrRead = true;
           dataReader.write(1);

           if(machineId == 1) {
                globalCholesterol = receivedData;
            } else if(machineId == 2) {
                globalHemoglobine = receivedData;
            } else if(machineId == 3) {
                globalBovendruk = receivedData;
            } else if(machineId == 4) {
                globalOnderdruk = receivedData;
            } else if(machineId == 5) {
                globalHartslag = receivedData;
            } else if(machineId == 6) {
                globalZuurstof = receivedData;
            }
       }        
     }
     else
     {
       idReader.listen();
       writeOrRead = true;
       dataReader.write(2);
       idReader.write(2);
     }
}
