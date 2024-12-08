// Define LED pin
uint8_t LEDS[] = { 13, 12 };
const int LED_AMOUNT = 2;
const double dutyCycle = 0;  // 1 = 100% off, 0,5 = 50% on, 0,0 = 100%, so always on. (ik weet dat dit omgekeerd is, maar heb niet zo veel zin om het aan te passen.)

unsigned long intervals[] = { 100, 500, 1000 };

enum statussen { SNEL,
                 MIDDEL,
                 TRAAG };

enum onOff { OFF,
             ON };

uint8_t huidigeStatus[LED_AMOUNT];

uint8_t onOffArray[LED_AMOUNT] = { OFF, OFF };

unsigned long previousMillisArray[LED_AMOUNT] = { 0, 0 };

void setup() {
  for (int i = 0; i < LED_AMOUNT; i++) {
    pinMode(LEDS[i], OUTPUT);
    huidigeStatus[i] = MIDDEL;
  }
  huidigeStatus[0] = SNEL;
}

void loop() {

  for (int i = 0; i < LED_AMOUNT; i++) {
    if (onOffArray[i] == OFF) {
      if (previousMillisArray[i] + (intervals[huidigeStatus[i]] * dutyCycle) <= millis()) {
        previousMillisArray[i] = millis();
        digitalWrite(LEDS[i], HIGH);
        onOffArray[i] = ON;
      }
    } else if(onOffArray[i] == ON){
      if (previousMillisArray[i] + intervals[huidigeStatus[i]] - (intervals[huidigeStatus[i]] * dutyCycle) <= millis()) {
        previousMillisArray[i] = millis();
        digitalWrite(LEDS[i], LOW);
        onOffArray[i] = OFF;
      }
    }
  }
}
