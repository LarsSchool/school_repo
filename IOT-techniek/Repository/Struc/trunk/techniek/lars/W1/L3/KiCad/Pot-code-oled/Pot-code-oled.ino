#include "ssd1306.h"
void setup()
{
    ssd1306_128x32_i2c_init();
    ssd1306_fillScreen(0x00);
    ssd1306_setFixedFont(ssd1306xled_font6x8);
    pinMode(A0, INPUT);
    Serial.begin(9600);
}
float progress = 0;

void loop()
{
  float state = analogRead(A0);
  float tempprogress = state / 1023;
  progress = tempprogress * 100;
    ssd1306_drawProgressBar( progress );
}




