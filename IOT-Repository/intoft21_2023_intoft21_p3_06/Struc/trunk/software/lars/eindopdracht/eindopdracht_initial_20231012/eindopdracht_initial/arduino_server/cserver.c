#include "cserver.h"
#include "metingen.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*Deze code is gebaseerd op de code uit de
 * parser-/tokenizeropdracht.*/

#define MSG_SIZE 100

struct request {
  enum {
    METHOD_UNKNOWN,
    METHOD_ERROR,
    GET,
    POST,
    PUT,
    DELETE
  } method;
  enum {
    TARGET_UNKNOWN,
    MODE,
    CBUFFSIZE,
    SENSOR_1,
    SENSOR_2,
    SENSOR_1_AVG,
    SENSOR_1_STDEV,
    SENSOR_1_ACTUAL,
    SENSOR_2_AVG,
    SENSOR_2_STDEV,
    SENSOR_2_ACTUAL
  } target;
  int16_t data;
  int16_t data_length;
};

enum sensorMode {
  PASSIVE, // 0 Sensor is not active
  ACTIVE   // 1 Sensor is active
};

enum tokenType {
  UNEXPECTED,  // 0 unexpected character as start of token
  TOO_LONG,    // 1 too many characters in token
  UNAVAILABLE, // 2 no more characters in the stream
  WS,          // 3 series of space characters
  EOL,         // 4 series of end of line characters
  WORD,        // 5 series of lowercase characters
  NUMBER       // 6 series of number characters
};

struct token {
  enum tokenType type;
  char value[TOKEN_ARR_LEN];
};

enum parserState {
  EXPECT_METHOD,      // 0 GET | POST
  EXPECT_WS_1,        // 1 SP
  EXPECT_TARGET,      // 2 /id /data
  EXPECT_WS_2,        // 3 SP
  EXPECT_VERSION,     // 4 HTTP/1.0
  EXPECT_CRLF_CRLF,   // 5 CRLFCRLF
  EXPECT_CRLF,        // 6 CRLF
  EXPECT_LENGTH,      // 7 PUT content_length
  EXPECT_WS_3,        // 8 SP
  EXPECT_VALUE,       // 9 content_length_value PUT or POST
  EXPECT_CRLF_CRLF_2, // 10 CRLFCRLF
  EXPECT_VALUE_2,     // 11 POST or PUT value
  ERROR,              // 12
  DONE                // 13
};

struct token getNextToken(struct stream);
enum parserState parseNextToken(struct token,
                                enum parserState,
                                struct request*);
int readyToRespond(enum parserState, const struct request*,
                   struct response*);

int isLetter(char c);
int isOther(char c);
int isNumber(char c);

void logmsg(char*);

struct response handleRequest(struct stream stream) {
  if (getSensor1() == NULL || getSensor2() == NULL ||
      getCbuffer_sensor1() == NULL ||
      getCbuffer_sensor2() == NULL) {
    initiateStructs();
  }
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
  return c == '_' || c == '/' || c == '.' || c == '-' ||
         c == ':';
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
      } else if (strncmp(tok.value, "PUT", TOKEN_ARR_LEN) ==
                 0) {
        request->method = PUT;
        return EXPECT_WS_1;
      } else if (strncmp(tok.value, "DELETE",
                         TOKEN_ARR_LEN) == 0) {
        request->method = DELETE;
        return EXPECT_WS_1;
      } else {
        request->method = METHOD_UNKNOWN;
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
      request->method = METHOD_ERROR;
      return ERROR;
    }
  case EXPECT_TARGET:
    if (tok.type == WORD) {
      if (strncmp(tok.value, "/config/mode",
                  TOKEN_ARR_LEN) == 0) {
        request->target = MODE;
      } else if (strncmp(tok.value, "/config/cbuffsize",
                         TOKEN_ARR_LEN) == 0) {
        request->target = CBUFFSIZE;
      } else if (strncmp(tok.value, "/sensors/1",
                         TOKEN_ARR_LEN) == 0) {
        request->target = SENSOR_1;
      } else if (strncmp(tok.value, "/sensors/2",
                         TOKEN_ARR_LEN) == 0) {
        request->target = SENSOR_2;
      } else if (strncmp(tok.value, "/sensors/1/avg",
                         TOKEN_ARR_LEN) == 0) {
        request->target = SENSOR_1_AVG;
      } else if (strncmp(tok.value, "/sensors/1/stdev",
                         TOKEN_ARR_LEN) == 0) {
        request->target = SENSOR_1_STDEV;
      } else if (strncmp(tok.value, "/sensors/1/actual",
                         TOKEN_ARR_LEN) == 0) {
        request->target = SENSOR_1_ACTUAL;
      } else if (strncmp(tok.value, "/sensors/2/avg",
                         TOKEN_ARR_LEN) == 0) {
        request->target = SENSOR_2_AVG;
      } else if (strncmp(tok.value, "/sensors/2/stdev",
                         TOKEN_ARR_LEN) == 0) {
        request->target = SENSOR_2_STDEV;
      } else if (strncmp(tok.value, "/sensors/2/actual",
                         TOKEN_ARR_LEN) == 0) {
        request->target = SENSOR_2_ACTUAL;
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
      if (request->method == PUT ||
          request->method == POST) {
        return EXPECT_CRLF;
      } else {
        return EXPECT_CRLF_CRLF;
      }
    } else {
      return ERROR;
    }
  case EXPECT_CRLF_CRLF:
    if (tok.type == EOL && strncmp(tok.value, "\r\n\r\n",
                                   TOKEN_ARR_LEN) == 0) {
      if (request->method == GET) {
        return DONE;
      } else if (request->method == DELETE) {
        return DONE;
      } else {
        return ERROR;
      }
    }
    return ERROR;
    break;
  case EXPECT_CRLF:
    if (tok.type == EOL &&
        strncmp(tok.value, "\r\n", TOKEN_ARR_LEN) == 0) {
      return EXPECT_LENGTH;
    } else {
      return ERROR;
    }
  case EXPECT_LENGTH:
    if (tok.type == WORD &&
        strncmp(tok.value,
                "Content-Length:", TOKEN_ARR_LEN) == 0) {
      return EXPECT_WS_3;
    } else {
      return ERROR;
    }
  case EXPECT_WS_3:
    if (tok.type == WS &&
        strncmp(tok.value, " ", TOKEN_ARR_LEN) == 0) {
      return EXPECT_VALUE;
    } else {
      return ERROR;
    }
  case EXPECT_VALUE:
    if (tok.type == NUMBER) {
      request->data = atoi(tok.value);
      return EXPECT_CRLF_CRLF_2;
    } else {
      return ERROR;
    }
  case EXPECT_CRLF_CRLF_2:
    if (tok.type == EOL && strncmp(tok.value, "\r\n\r\n",
                                   TOKEN_ARR_LEN) == 0) {
      if (request->method == POST ||
          request->method == PUT) {
        return EXPECT_VALUE_2;
      } else {
        return ERROR;
      }
    }
    return ERROR;
    break;
  case EXPECT_VALUE_2:
    if (request->method == POST && tok.type == NUMBER) {
      request->data = atoi(tok.value);
    } else if (request->method == PUT &&
               strncmp(tok.value, "passive",
                       request->data_length) == 0 &&
               request->target == MODE) {
      request->data = PASSIVE;
    } else if (request->method == PUT &&
               strncmp(tok.value, "active",
                       request->data_length) == 0 &&
               request->target == MODE) {
      request->data = ACTIVE;
    } else if (request->method == PUT &&
               request->target == CBUFFSIZE) {
      request->data = atoi(tok.value);
    } else {
      return ERROR;
    }
    return DONE;
  default:
    return ERROR;
  }
}

int readyToRespond(enum parserState state,
                   const struct request* req,
                   struct response* resp) {
  if (state == ERROR) {
    if (req->method == METHOD_ERROR ||
        req->method == METHOD_UNKNOWN) {
      resp->code = BAD_REQUEST_400;
    } else if (req->target == TARGET_UNKNOWN) {
      resp->code = NOT_FOUND_404;
    } else {
      resp->code = BAD_REQUEST_400;
    }
    return 1;
  }

  if (state == DONE) {
    if (req->method == GET) {
      switch (req->target) {
      case SENSOR_1_AVG:
        resp->get_avg = getAvg(getSensor1());
        resp->code = OK_200_GET_AVG;
        break;
      case SENSOR_2_AVG:
        resp->get_avg = getAvg(getSensor2());
        resp->code = OK_200_GET_AVG;
        break;
      case SENSOR_1_STDEV:
        resp->get_stdev = getStDev(getSensor1());
        resp->code = OK_200_GET_STDEV;
        break;
      case SENSOR_2_STDEV:
        resp->get_stdev = getStDev(getSensor2());
        resp->code = OK_200_GET_STDEV;
        break;
      case SENSOR_1_ACTUAL:
        resp->code = OK_200_GET_ACTUAL;
        resp->get_actual =
            cbGetActual(getCbuffer_sensor1());
        break;
      case SENSOR_2_ACTUAL:
        resp->code = OK_200_GET_ACTUAL;
        resp->get_actual =
            cbGetActual(getCbuffer_sensor2());
        break;
      default:
        resp->code = NOT_FOUND_404;
        break;
      }
      return 1;
    } else if (req->method == POST &&
               (req->target == SENSOR_1 ||
                req->target == SENSOR_2)) {
      double data = (double)req->data;
      if (req->target == SENSOR_1) {
        sensorAddWaarde(getSensor1(), data);
        cbAdd(getCbuffer_sensor1(), data);
      } else if (req->target == SENSOR_2) {
        sensorAddWaarde(getSensor2(), data);
        cbAdd(getCbuffer_sensor2(), data);
      }
      resp->code = CREATED_201_POST_MEASUREMENT;
      return 1;
    } else if (req->method == PUT && req->target == MODE &&
               req->data == PASSIVE) {
      resp->code = CREATED_201_PUT_MODE_PASSIVE;
      return 1;

    } else if (req->method == PUT && req->target == MODE &&
               req->data == ACTIVE) {
      resp->code = CREATED_201_PUT_MODE_ACTIVE;
      return 1;

    } else if (req->method == PUT &&
               req->target == CBUFFSIZE) {
      // Roep hem 2 keer aan, omdat beide buffers gelijk
      // moeten zijn qua size.
      if (req->data < 256) {
        setCbuffer_sensor1(cbFree(getCbuffer_sensor1()));
        setCbuffer_sensor2(cbFree(getCbuffer_sensor2()));

        setCbuffer_sensor1(
            cbInit(req->data, OVERWRITE_IF_FULL));
        setCbuffer_sensor2(
            cbInit(req->data, OVERWRITE_IF_FULL));

        resp->code = CREATED_201_PUT_CBUFFSIZE;
      } else {
        printf("ERROR: too big for size.");
        return 0;
      }
      return 1;

    } else if (req->method == DELETE &&
               req->target == SENSOR_1) {
      resetSensorMeasurements(getSensor1());
      cbReset(getCbuffer_sensor1());
      resp->code = CREATED_201_DELETE_MEASUREMENTS;
      return 1;

    } else if (req->method == DELETE &&
               req->target == SENSOR_2) {
      resetSensorMeasurements(getSensor2());
      cbReset(getCbuffer_sensor2());
      resp->code = CREATED_201_DELETE_MEASUREMENTS;
      return 1;

    } else {
      resp->code = NOT_FOUND_404;
      return 1;
    }
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
