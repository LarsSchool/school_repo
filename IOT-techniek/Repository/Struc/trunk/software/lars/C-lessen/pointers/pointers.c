#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

void swap(int *arg1, int *arg2) {
  int oldArg1 = *arg1;
  *arg1 = *arg2;
  *arg2 = oldArg1;
}

int read(const char *prompt) {
  printf("%s > ", prompt);
  char c;
  scanf(" %c", &c); // spatie zorgt ervoor dat je alleen "echte" tekens leest
  return c - '0';
}

//----Opdracht 5.7.2.4
/*double calculateAverage(const int8_t size) {
  int *cijfers = malloc(size * sizeof(int));
if(cijfers){
  for (int i = 0; i < size; i++) {
    printf("Please enter a number (only one digit, so 0-9) for location %i: ",
           i);
    char c;
    scanf(" %c", &c); // spatie zorgt ervoor dat je alleen "echte" tekens leest
    int value = c - '0';
    cijfers[i] = value;
  }
  double totaleWaarde = 0;
  for (int i = 0; i < size; i++) {
    totaleWaarde = totaleWaarde + cijfers[i];
  }
  free(cijfers);
  return totaleWaarde / size;
}
return -1;
}*/

//----Opdracht 5.7.2.5
double calculateAverage() {
  int16_t iterator = 0;
  int *cijfers = malloc(10 * sizeof(int));
  while (1) {
    printf("Please enter a number (only one digit, so 0-9): ");
    char c;
    scanf(" %c", &c); // spatie zorgt ervoor dat je alleen "echte" tekens leest
    int value = c - '0';
    if (value == 67 /*s*/ || value == 35 /*S*/) {
      double totaleWaarde = 0;
      for (int i = 0; i < iterator; i++) {
        totaleWaarde = totaleWaarde + cijfers[i];
        printf("Waarde cijfers[%i] : %i.\n", i, cijfers[i]);
      }
      free(cijfers);
      return totaleWaarde / iterator;
    }
    if (iterator >= 9) {
      int *temp;
      temp = realloc(cijfers, (iterator + 1) * sizeof(int));
      if (temp) {
        cijfers = temp;
      } else {
        printf("Te veel waardes of een andere realloc fout.\n");
      }
    }
    cijfers[iterator] = value;
    ++iterator;
  }
}

void ptr_2d(int aantal_rijen, int aantal_ints) {
  int **ptr = malloc(aantal_rijen * sizeof(int *));
  if (!ptr) {
    return;
  }
  for (int i = 0; i < aantal_rijen; i++) {
    ptr[i] = malloc(aantal_ints * sizeof(int));
    if (!ptr[i]) {
      // Handle allocation failure
      return;
    }
    for (int j = 0; j < aantal_ints; j++) {
      int random = rand() % 1000;
      ptr[i][j] = random;
    }
  }
  for (int i = 0; i < aantal_rijen; i++) {
    int hoogsteWaarde = 0;
    for (int j = 0; j < aantal_ints; j++) {
      if (ptr[i][j] > hoogsteWaarde) {
        hoogsteWaarde = ptr[i][j];
      }
    }
    printf("Hoogste waarde van rij %i is %i.\n", i, hoogsteWaarde);
  }
  for (int i = 0; i < aantal_rijen; i++) {
    free(ptr[i]);
  }
  free(ptr);
}

void bubble(int (*array)[], const int8_t size) {

  // Op deze manier kan je de pointer naar de array accessen.  printf("Bubble:
  // %i\n", (*array)[1]);
  for (int i = 0; i < size - 1; i++) {
    for (int j = 0; j < size - 1; j++) {
      if ((*array)[j] > (*array)[j + 1]) {
        swap(&(*array)[j], &(*array)[j + 1]);
      }
    }
  }
}

// Opdracht 5.8.3.1

int foo(char c, float f) { return 2; }
int bar(char d, float g) { return 3; }
void baz(char e) { printf("run baz with %c\n", e); }

int main() {
  // Opdracht 5.7.2.1
  int i = 10, j = 20;
  swap(&i, &j);

  // Opdracht 5.7.2.2
  const int8_t numbersSize = 10;
  int numbers[10] = {82, 98, 62, 63, 17, 65, 19, 59, 40, 56};
  bubble(&numbers, numbersSize);
  for (int a = 0; a < numbersSize; a++) {
    printf("bubble %i: %i.\n", a, numbers[a]);
  }

  // Opdracht 5.7.2.3
  // int16_t numberSize = read("Please enter the amount of numbers -----");
  // printf("numberSize: %i.\n", numberSize);
  // double average = calculateAverage(numberSize);
  double average = calculateAverage();
  printf("\nThe average of these numbers is: %f.\n", average);

  // Opdracht 5.7.2.6
  ptr_2d(5, 8);

  // Opdracht 5.8.3.1
  // Dit is een functie pointer en kan verwijst nu dus naar de foo functie.
  int (*fp)(char, float) = foo;
  printf("%d\n", fp('a', 1.0)); // print 2

  fp = bar;
  printf("%d\n",
         fp('a', 1.0)); // print 3, ook al wordt dezelfde functie aangeroepen.
  // fp = baz; // warning: wrong function type, void instead of int.
}
