#include <avr/io.h>
#include <util/delay.h>
int wah = 0;

int main(void) {
  // Set DDB2 as input and DDB4, DDB5 as output
  DDRB &= ~(1 << DDB2);               // DDB2 as input
  DDRB |= (1 << DDB4) | (1 << DDB5);  // DDB4, DDB5 as output


  while (1) {
    // Check if DDB2 is high
    if (PINB & (1 << PINB2)) {
      wah++;
      if (wah > 4) {
        wah = 0;
      }
    } else {
      // DDB2 is low, turn off DDB4 and DDB5
    }
    if (wah == 1) {
      _delay_ms(1000);

      PORTB |= (1 << PORTB4) | (1 << PORTB5);
      _delay_ms(1000);
      PORTB &= ~((1 << PORTB4) | (1 << PORTB5));
    } else if (wah == 2) {
      _delay_ms(10);

      PORTB |= (1 << PORTB4) | (1 << PORTB5);
      _delay_ms(1000);
      PORTB &= ~((1 << PORTB4) | (1 << PORTB5));
    } else if (wah == 3) {
      _delay_ms(1500);

      PORTB |= (1 << PORTB4) | (1 << PORTB5);
      _delay_ms(1500);
      PORTB &= ~((1 << PORTB4) | (1 << PORTB5));
    } else if (wah == 4) {
      _delay_ms(1000);

      PORTB |= (1 << PORTB4) | (1 << PORTB5);
      _delay_ms(10);
      PORTB &= ~((1 << PORTB4) | (1 << PORTB5));
    } else {
      _delay_ms(30);

      PORTB |= (1 << PORTB4) | (1 << PORTB5);
      _delay_ms(3000);
      PORTB &= ~((1 << PORTB4) | (1 << PORTB5));
    }
  }

  return 0;
}
