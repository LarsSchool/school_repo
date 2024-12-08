#include <ctype.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

typedef enum { UNKNOWN, GET, POST, PUT, DELETE } verb;

verb isVerb(char charArray[]) {
  if (strncmp(charArray, "GET", 4) == 0) {
    return GET;
  } else if (strncmp(charArray, "POST", 5) == 0) {
    return POST;
  } else if (strncmp(charArray, "PUT", 4) == 0) {
    return PUT;
  } else if (strncmp(charArray, "DELETE", 7) == 0) {
    return DELETE;
  }
  return UNKNOWN;
}

int8_t countSpaceChars(char charArray[]) {
  int8_t amount = 0;
  for (int i = 0; i < strlen(charArray); i++) {
    if (isspace(charArray[i]) != 0) {
      ++amount;
    }
    printf("for loop: i = %i.\n", i);
  }
  return amount;
}

int main() {

  // Opdracht 5.6.2.1
  verb aVerb = isVerb("GET");
  printf("The magic verb is: %i.\n", aVerb);

  // Opdracht 5.6.2.2
  int8_t spaceAmount = countSpaceChars("\thi there!\r\n");
  printf("The magic amount of spaces has become: %i.\n", spaceAmount);
}
