#include "adder.h"
#include <stdio.h>
int main() {
  int a = 2, b = 6;
  printf("%d + %d = %d\n", a, b, add(a, b));
}
