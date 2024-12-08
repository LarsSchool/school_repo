#ifndef cserver_h
#define cserver_h

#include "circularbuffer.h"
#include "stream.h"

#define TOKEN_LEN 20
#define TOKEN_ARR_LEN                                      \
  TOKEN_LEN + 1 // one more to accomodate for null char

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

void initLogger(void (*)(const char*));

#endif
