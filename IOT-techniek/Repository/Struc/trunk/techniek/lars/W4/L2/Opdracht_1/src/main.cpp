#include <Arduino.h>
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

#define MS_DELAY 250
volatile int pin = PORTB5;

int main (void) {
    DDRB |= _BV(DDB5); //PINMODE OUTPUT
    DDRB |= _BV(DDB4); //PINMODE OUTPUT
    DDRD &= ~_BV(DDD2); //PINMODE INPUT

    EICRA |= (1 << ISC01);    // Trigger on falling edge
    EIMSK |= (1 << INT0);     // Enable external interrupt INT0
    sei();                    // Enable global interrupts

    while(1) {
        PORTB |= _BV(pin);
        _delay_ms(MS_DELAY);
        PORTB &= ~_BV(pin);
        _delay_ms(MS_DELAY);
  }
}

ISR(INT0_vect){
PORTB &= ~_BV(pin);
 if(pin == PORTB5){
  pin = PORTB4;
 } else {
  pin = PORTB5;
 }
 PORTB |= _BV(pin);
}