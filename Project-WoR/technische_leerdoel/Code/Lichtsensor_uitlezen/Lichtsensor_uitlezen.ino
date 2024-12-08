/*
 * For more detail (instruction and wiring diagram), visit https://esp32io.com/tutorials/esp32-light-sensor
 */

#define LIGHT_SENSOR_PIN A0  // ESP8266 ADC pin
#define LIGHT_MODES_AMOUNT 6

enum lightModes {
  veryDark,
  dark,
  dim,
  light,
  bright,
  veryBright
};

void setup() {
  Serial.begin(9600);

  pinMode(LIGHT_SENSOR_PIN, INPUT);
}

void loop() {
  // Reads the input on analog pin (value between 0 and 1024)
  unsigned int analogValue = analogRead(LIGHT_SENSOR_PIN);
  unsigned short analogValueMapped = map(analogValue, 0, 1024, 0, LIGHT_MODES_AMOUNT - 1);

  Serial.print("Analog Value = ");
  Serial.print(analogValue);  // The raw analog reading
  Serial.print("  -  Mapped Value = ");
  Serial.print(analogValueMapped);  // The mapped analog value.

  switch (analogValueMapped) {
    case veryDark:
        Serial.println("   => Very very dark, scary!");
      break;
    case dark:
        Serial.println("   => Very dark");

      break;
    case dim:
        Serial.println("   => Dark");

      break ;
    case light:
        Serial.println("   => Dim");

      break ;
    case bright:
        Serial.println("   => Light");

      break;
    case veryBright:
        Serial.println("   => Bright, like daylight");
      break;
  }

  delay(500); // This can be removed after RTOS has been implemented and I can set a software timer there. I know a delay isn't all that nice.
}
