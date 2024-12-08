#ifndef cserver_h
#define cserver_h

#include "stream.h"

enum statuscode {
  INTERNAL_SERVER_ERROR_500, // failed to malloc cbuffers
  BAD_REQUEST_400,           // bad request
  NOT_FOUND_404,             // request target not found
  OK_200_GET_AVG,            // get mean
  OK_200_GET_STDEV,          // get standard deviation
  OK_200_GET_ACTUAL,         // empty cbuffer, get its mean
  CREATED_201_PUT_MODE_ACTIVE,    // start reading sensors
  CREATED_201_PUT_MODE_PASSIVE,   // stop reading sensors
  CREATED_201_PUT_CBUFFSIZE,      // send new cbuffer size
  CREATED_201_POST_MEASUREMENT,   // send a measurement
  CREATED_201_DELETE_MEASUREMENTS // clear collected data
};

struct response {
  enum statuscode code;
  union {
    double get_avg;
    double get_stdev;
    double get_actual;
  };
};

struct response handleRequest(struct stream);

//* Added 


#define TOKEN_LEN 20
#define TOKEN_ARR_LEN                                      \
  TOKEN_LEN + 1 // one more to accomodate for null char


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

struct request {
  enum { METHOD_UNKNOWN, METHOD_ERROR, GET, POST } method;
  enum { TARGET_UNKNOWN, DATA, ID } target;
};

enum parserState {
  EXPECT_METHOD,    // 0 GET | POST
  EXPECT_WS_1,      // 1 SP
  EXPECT_TARGET,    // 2 /id /data
  EXPECT_WS_2,      // 3 SP
  EXPECT_VERSION,   // 4 HTTP/1.0
  EXPECT_CRLF_CRLF, // 5 CRLFCRLF
  ERROR,            // 6
  DONE              // 7
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

#endif
