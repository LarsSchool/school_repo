#include <SoftwareSerial.h>

#define rxPin 2
#define txPin 3
#define rxPin2 4
#define txPin2 5

const byte CHOLESTEROL = 1;
const byte HEMOGLOBINE = 2;
const byte BOVENDRUK = 3;
const byte ONDERDRUK = 4;
const byte HARTSLAG = 5;
const byte PERCENTAGE = 6;

SoftwareSerial idReader = SoftwareSerial(rxPin, txPin);
SoftwareSerial dataReader = SoftwareSerial(rxPin2, txPin2);

bool writeOrRead = true;
byte faseHandShake = 0;
byte id2;
byte machineId;

const byte POTMETER = A0;

void softSerialSetup() {
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  pinMode(rxPin2, INPUT);
  pinMode(txPin2, OUTPUT);
  id2 = 0;
  machineId = 0;
  dataReader.begin(9600);
  idReader.begin(9600);
}

byte mockHeartRate() {
  const int minPotValue = 0;
  const int maxPotValue = 1023;

  const int minOutputValue = 50;
  const int maxOutputValue = 220;

  int potValue = analogRead(POTMETER);
  byte hartslag =
    map(potValue, minPotValue, maxPotValue, minOutputValue, maxOutputValue);
  return hartslag;
}

void sendPatientData(byte patientId) {
  byte cholesterol = random(1, 5);
  byte hemoglobine = random(8, 11);
  byte bovendruk = random(80, 120);
  byte onderdruk = random(60, 90);
  byte hartslag = mockHeartRate();
  sendData(combineId(CHOLESTEROL, patientId), cholesterol);
  sendData(combineId(HEMOGLOBINE, patientId), hemoglobine);
  sendData(combineId(BOVENDRUK, patientId), bovendruk);
  sendData(combineId(ONDERDRUK, patientId), onderdruk);
  sendData(combineId(HARTSLAG, patientId), hartslag);
  sendPercentage(patientId);
}

byte combineId(byte machineId, byte patientId) {
  return machineId * 10 + patientId;
}

void send2Patients() {
  sendPatientData(0);
  sendPatientData(1);
}

void sendPercentage(byte patientId) {
  double percentage;
  double waarde = get_dist(patientId,10);
  if (waarde <= 15) {
    percentage = map(waarde, 0, 15, 65, 95);
  } else {
    percentage = map(waarde, 16, 31, 95, 100);
  }
  sendData(combineId(PERCENTAGE, patientId), percentage);
}

void sendData(byte id, byte data) {
  readAndSendSoftSerial(id, data); 
  while (faseHandShake != 0)        // blijf de functie aanroepen totdat die klaar is
                                    // en gereset, volgende data kan worden verzonden.
  {
    readAndSendSoftSerial(id, data);
  }
}

void readAndSendSoftSerial(byte id, byte data) {
  if (!faseHandShake)  // eerste fase, stuur de id.
  {
    updateAlleWipwaps();
      // stuur eerst de id.
    id2 = id;
    idReader.write(id);
    //      Serial.println("sturen");
    faseHandShake++;
  } else if (faseHandShake == 1 && idReader.available() > 0)  // tweede fase check eerst of je een response hebt gekregen.
  {
    updateAlleWipwaps();
    byte dataRead = idReader.read();
    id2 = id % 10;
    machineId = (id - id2) / 10;
    if (dataRead == id2)  // de id is goed ontvangen stuur de data.
    {
      dataReader.listen();
      //      Serial.println("data sturen");
      dataReader.write(data);
      faseHandShake++;
    } else if (dataRead == 2)  // de id is niet goed ontvangen begin weer vanaf het begin.
    {
      faseHandShake = 0;
      //      Serial.println("mislukt");
    }

  } else if (faseHandShake == 2 && dataReader.available() > 0)  // check of de data goed is aangekomen.
  {
    updateAlleWipwaps();
    byte dataRead = dataReader.read();
    if (dataRead == 1)  // goed aangekomen, start weer opnieuw.
    {
      idReader.listen();
      //      Serial.println("reset");
      faseHandShake = 0;
    } else if (dataRead == 2)  // niet goed aangekomen, start opnieuw.
    {
      idReader.listen();
      //      Serial.println("reset failed");
      faseHandShake = 0;
    }
  }
}
