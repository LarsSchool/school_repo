const unsigned int INTERVAL = 20; // De interval moet 20 zijn, want anders klopt de frequentie niet meer ~Lars 12-04-2024
unsigned long prevMillis = 0;


void setup() {
  // put your setup code here, to run once:
  // pinMode(A0, INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:

  unsigned long huidigeTijd = millis();
  if (huidigeTijd - prevMillis >= INTERVAL) {
    //    Serial.println(analogRead(A0));

    int sumI = 0;
    int countI = 0;
    int sumJ = 0;
    int countJ = 0;
    for (int i = 0; i < 10; i++) {
      int waarde;
      for (int j = 0; j < 10; j++) {
        waarde = analogRead(A0);
        sumJ = sumJ + waarde;
        ++countJ;
      }
      sumI = sumI + waarde;
      ++countI;
    }
    Serial.println(sumI / countI);

    prevMillis = huidigeTijd;
  }
  //  delay(100);
}
