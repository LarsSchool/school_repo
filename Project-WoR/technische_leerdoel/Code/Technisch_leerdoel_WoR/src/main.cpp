/*
 * For more detail (wiring diagram), visit https://esp32io.com/tutorials/esp32-light-sensor
 */

#include <Arduino.h>
#include <stdint.h>

#define LIGHT_SENSOR_PIN 15 // For the ESP32 this is ADC pin 13
#define TEMP_SENSOR_PIN 2   // For the ESP32 this is ADC pin 12
#define LIGHT_MODES_AMOUNT 6

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
  Serial.print("LightTask is running on core ");
  Serial.println(xPortGetCoreID());

  for (;;)
  {
    if (!emergencyStopActive)
    {
      // Reads the input on analog pin (value between 0 and 4095)
      uint16_t analogValue = analogRead(LIGHT_SENSOR_PIN);
      uint8_t analogValueMapped = map(analogValue, 0, 4095, 0, LIGHT_MODES_AMOUNT - 1);

      Serial.print("[Light Sensor]: Analog Value = ");
      Serial.print(analogValue); // The raw analog reading
      Serial.print("  -  Mapped Value = ");
      Serial.print(analogValueMapped); // The mapped analog value.

      printLightSensorValue(analogValueMapped);

      Serial.println();

      if (analogValue >= 4090 || analogValue <= 150)
      {
        xTaskCreatePinnedToCore(activateEmergencyStop, "activateEmergencyStop", 1024, NULL, 100, &emergencyStopHandle, 1);
      }
    }
    else
    {
      Serial.println("EMERGENCY STOP ACTIVE, NOT READING SENSOR");
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
      
      Serial.print("[Temperature Sensor]: Analog Value = ");
      Serial.print(analogValue);
      Serial.print("  -  Temperature: ");
      Serial.print(tempC);
      Serial.println("°C");

      if (tempC >= 30.00 || tempC <= 10.00)
      {
        xTaskCreatePinnedToCore(activateEmergencyStop, "activateEmergencyStop", 1024, NULL, 100, &emergencyStopHandle, 1);
      }
    }
    else
    {
      Serial.println("EMERGENCY STOP ACTIVE, NOT READING SENSOR");
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