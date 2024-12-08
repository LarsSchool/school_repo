#include <stdio.h>

float temp[] = {
    19.00, 19.37, 19.05, 18.03, 17.18, 16.18, 16.95, 16.24, 15.98, 15.57, 14.97,
    15.50, 15.65, 15.19, 15.35, 15.35, 15.99, 16.55, 16.45, 17.23, 17.12, 17.70,
    17.70, 16.74, 16.76, 16.02, 16.96, 17.01, 17.88, 18.65, 18.51, 18.21, 18.27,
    19.19, 18.77, 18.85, 19.39, 19.62, 18.85, 17.53, 18.32, 19.03, 19.78, 20.63,
    20.80, 20.27, 20.40, 20.00, 20.74, 21.20, 20.78, 20.01, 20.63, 20.30, 19.75,
    19.80, 18.69, 18.72, 17.96, 18.27, 18.27, 16.50, 16.30, 15.55, 15.62, 16.10,
    16.36, 17.43, 17.29, 16.35, 16.37, 16.07, 16.44, 16.56, 16.73, 18.28, 19.93,
    20.74, 22.45, 21.80, 22.15, 21.02, 20.16, 18.55, 17.24, 17.08, 17.40, 17.20,
    18.58, 17.98, 18.43, 18.17, 18.48, 18.97, 19.57, 19.52, 19.35, 19.67, 20.55,
    21.26, 20.95, 19.39, 17.64, 17.30, 16.44, 15.88, 16.77, 15.88, 14.59, 14.49,
    14.33, 15.65, 15.67, 15.05, 14.41, 14.73, 16.22, 16.72, 15.29, 15.68, 16.14,
    16.26, 16.35, 17.15, 17.77, 19.79, 20.09, 19.82, 19.79, 19.56, 19.41, 19.35,
    19.73, 21.21, 21.09, 21.42, 21.79, 20.74, 20.96, 20.15, 20.22, 19.36, 19.03,
    18.02, 17.44, 16.92, 16.98, 16.14, 15.90, 15.66, 15.89, 16.18, 16.84, 17.49,
    18.03, 18.86, 19.87, 20.64, 20.88, 21.59, 21.14, 19.75, 19.11, 18.62, 18.17,
    18.11, 17.87, 17.84, 17.45, 16.81, 17.46, 17.46, 18.76, 19.64, 21.08, 20.60,
    21.04, 20.85, 20.31, 19.23, 20.33, 20.78, 20.48, 19.04, 19.06, 18.51, 19.18,
    18.70, 18.92, 18.50, 19.32, 18.80, 18.91, 19.35, 19.20, 18.20, 17.76, 16.86,
    16.93, 17.72};

void smooth_in_place(float array[], int size) {
  for (int i = 0; i < size - 2; i++) {
    array[i] = (array[i] + array[i + 1] + array[i + 2]) / 3;
  }
  for (int i = 0; i < size - 2; i++) {
    printf("nummer %i: %.2f\n", i, array[i]);
  }
}

float globaleArray[198];

void smooth(float array[], int size) {
  for (int i = 0; i < size - 2; i++) {
    globaleArray[i] = (array[i] + array[i + 1] + array[i + 2]) / 3;
  }
  for (int i = 0; i < size - 2; i++) {
    printf("nummer %i: %.2f\n", i, globaleArray[i]);
  }
}

void maximaleReeks(float array[], int size) {
  float maxWaarde = 0.0;
  int hoogsteWaarde[3];
  int tijdelijkeWaarde = 0;
  for (int i = 0; i < size; i++) {
    tijdelijkeWaarde = (array[i] + array[i + 1] + array[i + 2]) / 3;
    if (tijdelijkeWaarde > maxWaarde) {
      maxWaarde = tijdelijkeWaarde;
      hoogsteWaarde[0] = i;
      hoogsteWaarde[1] = i + 1;
      hoogsteWaarde[2] = i + 2;
    }
  }
  printf("De hoogste temperatuur is: %.2f met de locaties: %i met waarde %.2f, "
         "%i met waarde %.2f en %i met waarde %.2f.\n",
         maxWaarde, hoogsteWaarde[0], array[hoogsteWaarde[0]], hoogsteWaarde[1],
         array[hoogsteWaarde[1]], hoogsteWaarde[2], array[hoogsteWaarde[2]]);
}

int main() {
  smooth_in_place(temp, 200);
  smooth(temp, 198);
  maximaleReeks(temp, 200);
}
