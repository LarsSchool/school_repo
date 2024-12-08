#include <ctype.h>
#include <stdio.h>
#include <string.h>
enum verb { UNKNOWN, GET, POST, PUT, DELETE };

enum verb isVerb(char str[]) {

  if (0 == strncmp(str, "GET", 3)) {
    return GET;
  } else if (0 == strncmp(str, "POST", 4)) {
    return POST;
  } else if (0 == strncmp(str, "PUT", 3)) {
    return PUT;
  } else if (0 == strncmp(str, "DELETE", 6)) {
    return DELETE;
  }

  return UNKNOWN;
}

int countSpaceChar(char str[]) {
  int spaces = 0;
  for (int i = 0; i < strlen(str); i++) {
    if (isspace(str[i])) {
      spaces++;
    }
  }
  return spaces;
}

int main() {
  printf("is: %i \n", isVerb("GET"));
  printf("is: %i \n", isVerb("POST"));
  printf("is: %i \n", isVerb("PUT"));
  printf("is: %i \n", isVerb("DELETE"));
  printf("is: %i \n", isVerb("PUwTAMADRA"));

  printf("are: %i \n spaces",
         countSpaceChar("there are this amount of space sin this awmd"));
}
