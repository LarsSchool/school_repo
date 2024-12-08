int buttonstate = 0;
void setup() {
  pinMode(13, INPUT);
  Serial.begin(9600);
}

void loop() {
  buttonstate = analogRead(A0);
  Serial.println(buttonstate);
}
