

void printAnalogValues(){
  int dyastolicPressure = analogRead(A1);
  int systolicPressure = analogRead(A2);
  Serial.println("Dyastolic pressure is: " + dyastolicPressure);
  Serial.println("Systolic pressure is: " + systolicPressure);
  delay(1000);
}
