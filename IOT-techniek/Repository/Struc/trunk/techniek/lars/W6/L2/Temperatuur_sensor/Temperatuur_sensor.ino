// Include the libraries we need
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS A2 // 1-Wire bus data pin

// Setup a oneWire instance to communicate with any OneWire devices
// This is not limited to only the DS18B20
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);

void setup(void)
{
  // start serial port
  Serial.begin(9600);

  // Start up the DallasTemperature library
  sensors.begin();

  // Set up the resolution for our sensors
  sensors.setResolution(12);
}

void loop(void){ 
  sensors.requestTemperatures(); // Send the command to start the temperature conversion

  // After we got the temperatures, we can print them here.
  // We use the function ByIndex, and as an example get the temperature from the first sensor only.
  float tempC = sensors.getTempCByIndex(0);

  // Check if reading was successful
  if(tempC != DEVICE_DISCONNECTED_C) {
    Serial.println(tempC); // Print temperature of device 1 (index 0)
  }else{
    Serial.println("Error: Could not read temperature data");
  }
}
