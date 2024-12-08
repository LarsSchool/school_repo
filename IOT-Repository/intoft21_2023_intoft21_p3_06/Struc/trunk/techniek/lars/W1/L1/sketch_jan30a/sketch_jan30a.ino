// Define LED pin
const int ledPin = 13;

const unsigned long interval = 10; // 1 second

unsigned long previousMillis = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // unsigned long currentMillis = millis();

  // if (currentMillis - previousMillis >= interval) {
  //   previousMillis = currentMillis;

  //   // Read the state of the LED and set the opposite
  //   if (digitalRead(ledPin) == HIGH) {
  //     digitalWrite(ledPin, LOW);
  //     Serial.println("ON");
  //   } else {
  //     digitalWrite(ledPin, HIGH);
  //     Serial.println("OFF");
  //   }
  // }


  PORTB |= _BV(PORTB5);
  PORTB &= ~_BV(PORTB5);


    // digitalWrite(ledPin, LOW);
    // digitalWrite(ledPin, HIGH);
}
