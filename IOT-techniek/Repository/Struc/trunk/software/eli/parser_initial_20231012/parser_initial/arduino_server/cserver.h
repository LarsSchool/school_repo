#ifndef cserver_h
#define cserver_h

/*
Super simple example API

GET /id HTTP/1.0
GET /data HTTP/1.0
*/

#define TOKEN_LEN 20
#define TOKEN_ARR_LEN                                      \
  TOKEN_LEN + 1 // one more to accomodate for null char

struct stream {
  int (*available)();
  char (*peek)();
  char (*read)();
};

enum code { OK_ID, OK_DATA, NOT_FOUND, BAD_REQUEST };

struct response {
  enum code code;
  union {
    char id[TOKEN_ARR_LEN];
    int data;
  };
};

struct response handleRequest(struct stream);

void initLogger(void (*)(const char*));

/* self*/

#endif
