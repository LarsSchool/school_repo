#include <stdio.h>
#include <stdlib.h>
#include <time.h>
void swap(int* i, int* j) {
  //   printf("; in swap 1 %i , %i \n", *i, *j);

  int* temp = *i;
  *i = *j;
  *j = temp;
  //   printf("in swap 2 %i , %i", *i, *j);
}

void bubble(int (*arr)[], int sz) {
  for (int i = 0; i < sz; i++) {
    for (int j = 0; j < sz - 1; j++) {
      if ((*arr)[j] > (*arr)[j + 1]) {
        // printf("%i against %i", arr[j], arr[j + 1]);
        swap(&(*arr)[j], &(*arr)[j + 1]);
        // printf(";  %i against %i \n", arr[j], arr[j + 1]);
      }
    }
  }
  for (int i = 0; i < sz; i++) {
    printf("%i: %i \n", i, (*arr)[i]);
  }
}

int main() {
  //   int i = 10, j = 20;
  //   printf("out swap 1 %i , %i \n ", i, j);

  //   swap(&i, &j); // i wordt 20, j wordt 10
  //   printf("out swap 2 %i , %i \n ", i, j);
  clock_t t;
  t = clock();
  int sz = 21900;
  int maxnmbr = 2000000;
  int arr[sz];
  for (int i = 0; i < sz; i++) {
    arr[i] = rand() % maxnmbr + 1;
  }

  bubble(&arr, sz);
  t = clock() - t;
  double time = ((double)t) / CLOCKS_PER_SEC;
  printf("Time it took: %f Seconden \n", time);
}


  