#include <Arduino.h>
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

#define MS_DELAY 50
bool stop = false;
PINB;
int main (void) {
    TCCR0B |= ((1 << CS02) | (1 << CS00)); // Timer 0 prescaling - divides by 1024 */
    TCCR0A |= (1 << WGM01); // Put timer 0 in CTC mode
    OCR0A = 10; // Count 10 cycles for interrupt
    TIMSK |= (1 << OCIE0A); // enable timer compare interrupt
    sei();


    DDRB |= _BV(DDB4); //PINMODE OUTPUT
    DDRB |= _BV(DDB3); //PINMODE OUTPUT

    while(!stop) {
        PORTB |= _BV(PORTB4);
        _delay_ms(MS_DELAY);
        PORTB &= ~_BV(PORTB4);
        PORTB |= _BV(PORTB3);
        _delay_ms(MS_DELAY);
        PORTB &= ~_BV(PORTB3);
  }
}

ISR(TIMER0_COMPA_vect)
{
  stop = true;
}