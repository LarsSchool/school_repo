#include "cserver.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
Deze code is bedoeld voor de uitleg van de tokenizer en de
parser.

Dit voorbeeld is vooral duidelijk in de verschillende
achtereenvolgende stappen van het tokenize en parse proces.
Verder pretendeert het op geen enkele manier de beste
of meest efficënte of wat dan ook voor code te zijn.

Er valt van alles te zeggen over de codekwaliteit
(bijvoorbeeld, te grote functies en te veel in een bestand),
maar dat is voor de uitleg niet het punt.

Voor de eindopdracht krijg je een vergelijkbaar project als
uitgangspunt.

Essentieel is dat je bij je eindopdracht niets verandert
aan de header-file die je krijgt: de beoordeling maakt
gebruik van een unittest die met je code moet kunnen
compileren.

(toevoegen is dus niet zo erg).

(c) Chris van Uffelen, 2021
*/

#define MSG_SIZE 100

struct response handleRequest(struct stream stream) {
  enum parserState state = EXPECT_METHOD;
  struct request request = {.method = METHOD_UNKNOWN,
                            .target = TARGET_UNKNOWN};
  struct response response;

  char msg[MSG_SIZE] = {0};

  int done = 0;

  while (!done) {
    struct token token = getNextToken(stream);

#ifndef NDEBUG
    snprintf(msg, MSG_SIZE,
             "* token type %d, token value (\"%s\")\n",
             token.type, token.value);
    logmsg(msg);
#endif

    enum parserState next =
        parseNextToken(token, state, &request);

#ifndef NDEBUG
    snprintf(msg, MSG_SIZE, "* parser state %d\n", next);
    logmsg(msg);
#endif

    done = readyToRespond(state, &request, &response);
    state = next;
  }

  return response;
}

// tokenizer in one function
struct token getNextToken(struct stream stream) {
  struct token tok;
  memset(tok.value, '\0',
         TOKEN_ARR_LEN); // zero all characters

  if (!stream.available()) {
    tok.type = UNAVAILABLE;
    return tok;
  }

  int n = 0;

  if (stream.peek() == ' ') {
    tok.type = WS;
    while (stream.available()) {
      if (n == TOKEN_LEN) {
        tok.type = TOO_LONG;
        return tok;
      } else if (stream.peek() == ' ') {
        tok.value[n] = stream.read();
        n++;
      } else {
        return tok;
      }
    }
  } else if (isNumber(stream.peek())) {
    tok.type = NUMBER;
    while (stream.available()) {
      if (n == TOKEN_LEN) {
        tok.type = TOO_LONG;
        return tok;
      } else if (stream.peek() >= '0' &&
                 stream.peek() <= '9') {
        tok.value[n] = stream.read();
        n++;
      } else {
        return tok;
      }
    }
  } else if (isLetter(stream.peek()) ||
             isOther(stream.peek())) {
    tok.type = WORD;
    while (stream.available()) {
      if (n == TOKEN_LEN) {
        tok.type = TOO_LONG;
        return tok;
      } else if (isLetter(stream.peek()) ||
                 isNumber(stream.peek()) ||
                 isOther(stream.peek())) {
        tok.value[n] = stream.read();
        n++;
      } else {
        return tok;
      }
    }
  } else if (stream.peek() == '\r' ||
             stream.peek() == '\n') {
    tok.type = EOL;
    while (stream.available()) {
      if (n == TOKEN_LEN) {
        tok.type = TOO_LONG;
        return tok;
      } else if (stream.peek() == '\r' ||
                 stream.peek() == '\n') {
        tok.value[n] = stream.read();
        n++;
      } else {
        return tok;
      }
    }
  } else /* unexpected begin of token */ {
    tok.type = UNEXPECTED;
    return tok;
  }

  // you end up here in case you started parsing
  // and end up with !stream.available()
  // so, last valid token in the stream.
  return tok;
}

int isNumber(char c) { return c >= '0' && c <= '9'; }

int isLetter(char c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

int isOther(char c) {
  return c == '_' || c == '/' || c == '.' || c == '-' ;
}

// parser in one function
enum parserState parseNextToken(struct token tok,
                                enum parserState curr,
                                struct request* request) {

  switch (tok.type) {
  case UNEXPECTED:
    return ERROR;
  case TOO_LONG:
    return ERROR;
  case UNAVAILABLE:
    return ERROR;
  default:; // prevent warning as other states are treated
            // below
  }

  switch (curr) {
  case EXPECT_METHOD:
    if (tok.type == WORD) {
      // compare strings up till last null char
      if (strncmp(tok.value, "GET", TOKEN_ARR_LEN) == 0) {
        request->method = GET;
        return EXPECT_WS_1;
      } else if (strncmp(tok.value, "POST",
                         TOKEN_ARR_LEN) == 0) {
        request->method = POST;
        return EXPECT_WS_1;
      } else {
        request->method = METHOD_ERROR;
        return ERROR;
      }
    } else {
      return ERROR;
    }
  case EXPECT_WS_1:
    if (tok.type == WS &&
        strncmp(tok.value, " ", TOKEN_ARR_LEN) == 0) {
      return EXPECT_TARGET;
    } else {
      return ERROR;
    }
  case EXPECT_TARGET:
    if (tok.type == WORD) {
      if (strncmp(tok.value, "/data", TOKEN_ARR_LEN) == 0) {
        request->target = DATA;
      } else if (strncmp(tok.value, "/id", TOKEN_ARR_LEN) ==
                 0) {
        request->target = ID;
      } else {
        request->target = TARGET_UNKNOWN;
      }
      return EXPECT_WS_2;
    } else {
      return ERROR;
    }
  case EXPECT_WS_2:
    if (tok.type == WS &&
        strncmp(tok.value, " ", TOKEN_ARR_LEN) == 0) {
      return EXPECT_VERSION;
    } else {
      return ERROR;
    }
  case EXPECT_VERSION:
    if (tok.type == WORD && strncmp(tok.value, "HTTP/1.0",
                                    TOKEN_ARR_LEN) == 0) {
      return EXPECT_CRLF_CRLF;
    } else {
      return ERROR;
    }
  case EXPECT_CRLF_CRLF:
    if (tok.type == EOL && strncmp(tok.value, "\r\n\r\n",
                                   TOKEN_ARR_LEN) == 0) {
      return DONE;
    } else {
      return ERROR;
    }
  case DONE:
    return DONE;
  default:
    return ERROR;
  }
}

int readyToRespond(enum parserState state,
                   const struct request* req,
                   struct response* resp) {

  if (state == ERROR) {
    resp->code = BAD_REQUEST;
    return 1;
  }

  if (state == DONE) {
    if (req->method == GET && req->target == ID) {
      resp->code = OK_ID;
      strncpy(resp->id, "joe", TOKEN_LEN);
    } else if (req->method == GET && req->target == DATA) {
      resp->code = OK_DATA;
      resp->data = 234;
    } else if (req->method == GET || req->method == POST) {
      resp->code = NOT_FOUND;
    }
    return 1;
  }

  return 0;
}

///// log in C to Arduino
void (*logfunction)(const char*);
void initLogger(void (*func)(const char*)) {
  logfunction = func;
}
void logmsg(char* msg) {
  if (logfunction) {
    logfunction(msg);
  }
}
