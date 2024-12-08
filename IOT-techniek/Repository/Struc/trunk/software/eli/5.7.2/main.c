#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int read(const char* prompt) {
  printf("%s > ", prompt);
  char c;
  scanf(" %c", &c); // spatie zorgt ervoor dat je alleen
  // "echte" tekens leest
  return c - '0';
}






int main() {
  int arr[5][5] = {0};
  int amount = read("insert insert amount\n");
  int avr = 0;
  for (int i = 0; i < amount; ++i) {
    avr += read("insert\n");
  }
  avr = avr / amount;
  printf("%i \n", avr);
}


