const unsigned int INTERVAL = 5; // This has to be the same as on the sender, otherwise working is not guaranteed.
unsigned long prevMillis = 0;

void setup() {
  pinMode(A0, INPUT);
  Serial.begin(9600);
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - prevMillis >= INTERVAL) {
    
    unsigned long sumI = 0;
    unsigned short countI = 0;
    unsigned long sumJ = 0;
    unsigned short countJ = 0;
    for (int i = 0; i < 10; i++) {
      long value;
      for (int j = 0; j < 10; j++) {
        value = analogRead(A0);
        sumJ = sumJ + value;
        ++countJ;
      }
      value = sumJ / countJ;
      sumI = sumI + value;
      ++countI;      
    }

    Serial.println(sumI / countI);

    prevMillis = currentMillis;
  }
}
