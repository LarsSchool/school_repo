const unsigned short dacEcgPin = A0;
const unsigned int INTERVALECG = 5;
unsigned long prevMillisEcg = 0;
byte globalECG;



void ReadAndPrintDacSignal()
{
  unsigned long currentMillis = millis();
  if (currentMillis - prevMillisEcg >= INTERVALECG) {
    long sumI = 0;
    long countI = 0;
    long sumJ = 0;
    long countJ = 0;
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
    addData(sumI / countI);
    globalECG = sumI / countI;
//     Serial.print("ECG: ");
     Serial.print(sumI / countI);
    prevMillisEcg = currentMillis;
  } 
}
