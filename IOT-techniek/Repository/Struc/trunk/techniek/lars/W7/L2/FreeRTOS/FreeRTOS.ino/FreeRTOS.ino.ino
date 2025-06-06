// Copied from https://circuitdigest.com/microcontroller-projects/arduino-freertos-tutorial1-creating-freertos-task-to-blink-led-in-arduino-uno
#include <Arduino_FreeRTOS.h>

const byte LEDPIN1 = 12;
const byte LEDPIN2 = 11;
const int DELAY1 = 200;
const int DELAY2 = 300;
const int DELAYPRINT = 1000;

char ptrTaskList[250];

void TaskBlink1( void *pvParameters );
void TaskBlink2( void *pvParameters );
void Taskprint( void *pvParameters );

void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  xTaskCreate(
    TaskBlink1
    ,  "task1"
    ,  128
    ,  NULL
    ,  1
    ,  NULL );

  xTaskCreate(
    TaskBlink2
    ,  "task2"
    ,  128
    ,  NULL
    ,  1
    ,  NULL );

  xTaskCreate(
    Taskprint
    ,  "taskprint"
    ,  128
    ,  NULL
    ,  1
    ,  NULL );

  vTaskStartScheduler();

}

void loop()
{
}

void TaskBlink1(void *pvParameters)  {
  pinMode(LEDPIN1, OUTPUT);
  while (1)
  {
    Serial.println("Task1");
    digitalWrite(LEDPIN1, HIGH);
    vTaskDelay( DELAY1 / portTICK_PERIOD_MS );
    digitalWrite(LEDPIN1, LOW);
    vTaskDelay( DELAY1 / portTICK_PERIOD_MS );
  }
}

void TaskBlink2(void *pvParameters)
{
  pinMode(LEDPIN2, OUTPUT);
  while (1)
  {
    Serial.println("Task2");
    digitalWrite(LEDPIN2, HIGH);
    vTaskDelay( DELAY2 / portTICK_PERIOD_MS );
    digitalWrite(LEDPIN2, LOW);
    vTaskDelay( DELAY2 / portTICK_PERIOD_MS );
  }
}

void Taskprint(void *pvParameters)  {
  while (1)
  {
    vTaskList(ptrTaskList);
    Serial.println(F("**********************************"));
    Serial.println(F("Task  State   Prio    Stack    Num"));
    Serial.println(F("**********************************"));
    Serial.print(ptrTaskList);
    Serial.println(F("**********************************"));
    vTaskDelay(DELAYPRINT / portTICK_PERIOD_MS);
  }
}