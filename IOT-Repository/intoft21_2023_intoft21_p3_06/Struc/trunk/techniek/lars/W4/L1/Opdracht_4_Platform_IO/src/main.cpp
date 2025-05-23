#include <avr/io.h>
#include <util/delay.h>

#define MS_DELAY 100
bool buttonSwitch = false;


void checkButton(){
  if ((PINB & _BV(PINB3)) == 8) {
    if(buttonSwitch == true){
      buttonSwitch = false;
    } else {
      buttonSwitch = true;
    }
  }
}

int main (void) {
    DDRB |= _BV(DDB5); //PINMODE OUTPUT
    DDRB |= _BV(DDB4); //PINMODE OUTPUT
    DDRB &= ~_BV(DDB3); //PINMODE INPUT

    while(1) {
        checkButton();

        PORTB |= _BV(PORTB5);
        _delay_ms(MS_DELAY);

        checkButton();

        PORTB &= ~_BV(PORTB5);

          if(buttonSwitch){
            PORTB |= _BV(PORTB4);
            _delay_ms(MS_DELAY);
            PORTB &= ~_BV(PORTB4);
          } else {
            _delay_ms(MS_DELAY);
          }
        checkButton();
    }
}