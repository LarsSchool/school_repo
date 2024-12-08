  

const unsigned short dacEcgPin[2] = {A0, A1};
const unsigned int INTERVALECG = 0;
unsigned long prevMillisEcg = 0;



long ReadAndPrintDacSignal(unsigned short pin)
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
        value = analogRead(dacEcgPin[pin]);
        sumJ = sumJ + value;
        ++countJ;
      }
      value = sumJ / countJ;
      sumI = sumI + value;
      ++countI;
    }
    addData(sumI / countI, 0, 0);
    if (pin == 0)
    {
      //Serial.print("ecg signaal ");
      //Serial.println(sumI / countI);
    }
    //    if(pin == A1){
    ////          Serial.print(100 + (sumI / countI));
    //    } else {
    ////          Serial.print(sumI / countI);
    //    }
    //    Serial.print(" ");
    prevMillisEcg = currentMillis;

    return 100 + (sumI / countI);
  }
}
