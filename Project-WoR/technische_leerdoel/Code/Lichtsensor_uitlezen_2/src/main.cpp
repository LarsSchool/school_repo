/*
 * For more detail (instruction and wiring diagram), visit https://esp32io.com/tutorials/esp32-light-sensor
 */

#include <Arduino.h>

#define LIGHT_SENSOR_PIN 15 // For the ESP32 this is ADC pin 10
#define LIGHT_MODES_AMOUNT 6

TaskHandle_t lightsensorCheck;

enum lightModes
{
  veryDark,
  dark,
  dim,
  light,
  bright,
  veryBright
};

void printLightSensorValue(unsigned short mappedValue)
{
  switch (mappedValue)
  {
  case veryDark:
    Serial.print("   => Very very dark, scary!");
    break;
  case dark:
    Serial.print("   => Very dark");

    break;
  case dim:
    Serial.print("   => Dark");

    break;
  case light:
    Serial.print("   => Dim");

    break;
  case bright:
    Serial.print("   => Light");

    break;
  case veryBright:
    Serial.print("   => Bright, like daylight");
    break;
  }
}

void checkLightSensor(void *parameter)
{
  // Reads the input on analog pin (value between 0 and 4095)
  // unsigned int analogValue = analogRead(LIGHT_SENSOR_PIN);
  // unsigned short analogValueMapped = map(analogValue, 0, 4095, 0, LIGHT_MODES_AMOUNT - 1);

  // Serial.print("Analog Value = ");
  // Serial.print(analogValue); // The raw analog reading
  // Serial.print("  -  Mapped Value = ");
  // Serial.print(analogValueMapped); // The mapped analog value.

  // printSensorValue(analogValueMapped);

  // Serial.println();

  // vTaskDelay(500 / portTICK_PERIOD_MS);
  // delay(500); // This can be removed after RTOS has been implemented and I can set a software timer there. I know a delay isn't all that nice.
}

void setup()
{
  Serial.begin(9600);

  // pinMode(LIGHT_SENSOR_PIN, INPUT);

  xTaskCreate(
      checkLightSensor,   // Function that should be called
      "checkLightSensor", // Name of the task (for debugging)
      10000,              // Stack size (bytes), is a random estimate, this isnt based on anything.
      NULL,               // Parameter to pass
      1,                  // Task priority
      &lightsensorCheck,  // Task handle
      0                   // Selected core to run on
  );
}

void loop()
{
  // getAndPrintSensorValue();
}

// TaskHandle_t Task1;
// TaskHandle_t Task2;

// const int led_1 = 32;
// const int led_2 = 25;

// void Task1code( void * parameter ){
//   Serial.print("Task1 is running on core ");
//   Serial.println(xPortGetCoreID());

//   for(;;){
//     digitalWrite(led_1, HIGH);
//     delay(500);
//     digitalWrite(led_1, LOW);
//     delay(500);
//   }
// }

// void Task2code( void * parameter ){
//   Serial.print("Task2 is running on core ");
//   Serial.println(xPortGetCoreID());

//   for(;;){
//     digitalWrite(led_2, HIGH);
//     delay(1000);
//     digitalWrite(led_2, LOW);
//     delay(1000);
//   }
// }

// void setup() {
//   Serial.begin(115200);
//   pinMode(led_1, OUTPUT);
//   pinMode(led_2, OUTPUT);

//   xTaskCreatePinnedToCore(Task1code,"Task1",10000,NULL,1,&Task1,0);
//   delay(500);

//   xTaskCreatePinnedToCore(Task2code,"Task2",10000,NULL,1,&Task2,1);
//     delay(500);
// }

// void loop() {

// }