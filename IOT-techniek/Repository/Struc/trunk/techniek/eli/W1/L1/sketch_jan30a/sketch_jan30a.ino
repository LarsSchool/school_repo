// Define LED pin
const int ledPin = 13;

// Define interval in milliseconds
const unsigned long interval = 500; // 1 second

// Variable to store the last time LED was updated
unsigned long previousMillis = 0;

void setup() {
  // Initialize the LED pin as an output
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Get the current time
  unsigned long currentMillis = millis();

  // Check if the interval has passed
  if (currentMillis - previousMillis >= interval) {
    // Save the last time the LED was updated
    previousMillis = currentMillis;

    // Read the state of the LED and set the opposite
    if (digitalRead(ledPin) == HIGH) {
      digitalWrite(ledPin, LOW);
      Serial.println("0");
    } else {
      digitalWrite(ledPin, HIGH);
      Serial.println("1");
    }
  }

  // Other code can be executed here without being blocked by delay()
}
