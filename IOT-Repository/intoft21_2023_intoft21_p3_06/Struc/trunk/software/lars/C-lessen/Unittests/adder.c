#include "adder.h"
// addTwoValues is not exposed in adder.h
// it is the function that does the difficult task of
// adding two integer functions.
int addTwoValues(int a, int b) { return a + b; }
// add is declared in adder.h. Users of adder.h may think
// that add does the difficult addition, however, it merely
// delegates its task to addTwoValues().
int add(int a, int b) { return addTwoValues(a, b); }
