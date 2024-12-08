#include <avr/interrupt.h>
#include <avr/io.h>

volatile bool pin = 1;


int main() {
  DDRB |= (1 << DDB4) | (1 << DDB3);  // DDB4, DDB5 as output
  while (1) {
    if (pin == 1) {
      PORTB |= (1 << PORTB3);
      _delay_ms(200);
      PORTB &= ~(1 << PORTB3);
            _delay_ms(200);

    } else {
      PORTB |= (1 << PORTB4);
      _delay_ms(200);
      PORTB &= ~(1 << PORTB4);
      _delay_ms(200);

    }
  }
}