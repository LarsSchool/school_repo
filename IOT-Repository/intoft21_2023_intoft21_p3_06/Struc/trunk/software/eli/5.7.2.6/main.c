#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void PtrArray2D(int first, int second) {
  int** ptr = malloc(first * sizeof(int*));
  if (!ptr) {
    return;
  }
  for (int i = 0; i < first; i++) {
    ptr[i] = malloc(second * sizeof(int));
    if (!ptr[i]) {
      for (int j = 0; j < first; j++) {
        free(ptr[j]);
      }
      free(ptr);
      return;
    }
  }
  for (int i = 0; i < first; i++) {
    for (int j = 0; j < second; j++) {
      ptr[i][j] = rand() % 1000 + 1;
    }
  }
  for (int i = 0; i < first; i++) {
    int biggest = 0;
    int index = 0;
    for (int j = 0; j < second; j++) {
      if (ptr[i][j] > biggest) {
        biggest = ptr[i][j];
        index = j;
      }
    }
    printf("%i is het hoogst voor kolom %i op rij %i \n", biggest, i, index);
    free(ptr[i]);
  }
  free(ptr);
}

// void allocPointer(){

// }

int main() { PtrArray2D(12, 12); }
