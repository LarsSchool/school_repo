/*
 * For more detail (wiring diagram), visit https://esp32io.com/tutorials/esp32-light-sensor
 */

#include <Arduino.h>
#include <stdint.h>

#define STRINGIFY(x) #x
#define TOSTRING(x) STRINGIFY(x)
#define LIGHT_SENSOR_PIN 15 // For the ESP32 this is ADC pin 13
#define TEMP_SENSOR_PIN 2   // For the ESP32 this is ADC pin 12
#define LIGHT_MODES_AMOUNT 6
#define TASK_DELAY 1000

enum lightModes
{
  veryDark,
  dark,
  dim,
  light,
  bright,
  veryBright
};

TaskHandle_t lightsensorCheckHandle;
TaskHandle_t tempsensorCheckHandle;
TaskHandle_t emergencyStopHandle;

bool emergencyStopActive = false;
const bool debugMode = false;

float tempC; // temperature in Celsius

void activateEmergencyStop(void *parameter)
{
  Serial.println("Emergency Stop activated!!");
  emergencyStopActive = true;

  vTaskDelete(NULL);
}

void dectivateEmergencyStop(void *parameter)
{
  Serial.println("Emergency Stop activated!!");
  emergencyStopActive = true;

  vTaskDelete(NULL);
}

void printLightSensorValue(unsigned short mappedValue)
{
  switch (mappedValue)
  {
  case veryDark:
    Serial.print("   => (0) Very very dark, scary!");
    break;
  case dark:
    Serial.print("   => (1) Very dark");

    break;
  case dim:
    Serial.print("   => (2) Dark");

    break;
  case light:
    Serial.print("   => (3) Dim");

    break;
  case bright:
    Serial.print("   => (4) Light");

    break;
  case veryBright:
    Serial.print("   => (5) Bright, like daylight");
    break;
  }
}

void checkLightSensor(void *parameter)
{
  Serial.print("LightTask is running on core ");
  Serial.println(xPortGetCoreID());

  for (;;)
  {
    if (!emergencyStopActive)
    {
      // Reads the input on analog pin (value between 0 and 4095)
      uint16_t analogValue = analogRead(LIGHT_SENSOR_PIN);
      uint8_t analogValueMapped = map(analogValue, 0, 4095, 0, LIGHT_MODES_AMOUNT - 1);

      if (debugMode)
      {
        Serial.print("[Light Sensor]: Analog Value = ");
        Serial.print(analogValue); // The raw analog reading
        Serial.print("  -  Light Level (0-" TOSTRING(LIGHT_MODES_AMOUNT) ")");
        Serial.print(analogValueMapped); // The mapped analog value.
      }
      else
      {
        Serial.print("Light Level (0-" TOSTRING(LIGHT_MODES_AMOUNT) ")");
        Serial.print(analogValueMapped); // The mapped analog value.
      }

      printLightSensorValue(analogValueMapped);
      Serial.println();

      if (analogValue >= 4090 || analogValue <= 150)
      {
        xTaskCreatePinnedToCore(activateEmergencyStop, "activateEmergencyStop", 1024, NULL, 100, &emergencyStopHandle, 1);
      }
    }
    else
    {
      Serial.println("EMERGENCY STOP ACTIVE, NOT READING LIGHTSENSOR");
    }

    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void checkTempSensor(void *parameter)
{
  Serial.print("TempTask is running on core ");
  Serial.println(xPortGetCoreID());

  for (;;)
  {
    if (!emergencyStopActive)
    {
      // Reads the input on analog pin (value between 0 and 4095)
      uint16_t analogValue = analogRead(TEMP_SENSOR_PIN);

      double tempC = map(analogValue, 0, 4095, -10, 125) - 4; // -4 has to be there so it can also go below 0.

      if (debugMode)
      {
        Serial.print("[Temperature Sensor]: Analog Value = ");
        Serial.print(analogValue);
        Serial.print("  -  Temperature: ");
        Serial.print(tempC);
        Serial.print("°C");
      }
      else
      {
        Serial.print("Temperature: ");
        Serial.print(tempC);
        Serial.print("°C");
      }
      Serial.println();

      if (tempC >= 30.00 || tempC <= 10.00)
      {
        xTaskCreatePinnedToCore(activateEmergencyStop, "activateEmergencyStop", 1024, NULL, 100, &emergencyStopHandle, 1);
      }
    }
    else
    {
      Serial.println("EMERGENCY STOP ACTIVE, NOT READING TEMPSENSOR");
    }

    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void setup()
{
  Serial.begin(9600);

  xTaskCreatePinnedToCore(checkLightSensor, "LightTask", 1024, NULL, 1, &lightsensorCheckHandle, 0);
  xTaskCreatePinnedToCore(checkTempSensor, "TempTask", 1024, NULL, 1, &tempsensorCheckHandle, 1);
}

void loop()
{
}