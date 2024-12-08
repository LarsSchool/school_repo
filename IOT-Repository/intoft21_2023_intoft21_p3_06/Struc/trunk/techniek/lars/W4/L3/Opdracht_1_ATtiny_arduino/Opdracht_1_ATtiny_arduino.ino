#include <Arduino.h>
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

#define MS_DELAY 50

int main (void) {
    DDRB |= _BV(DDB4); //PINMODE OUTPUT
    DDRB |= _BV(DDB3); //PINMODE OUTPUT

    while(1) {
        PORTB |= _BV(PORTB4);
        _delay_ms(MS_DELAY);
        PORTB &= ~_BV(PORTB4);
        PORTB |= _BV(PORTB3);
        _delay_ms(MS_DELAY);
        PORTB &= ~_BV(PORTB3);
  }
}