#include "arduino_server/cserver.h"
#include "buffermock.h"
#include <glib.h>
#include <stdio.h>

void test_get_data() {
  reset_buffer("GET /data HTTP/1.0\r\n\r\n");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);

  g_assert_cmpint(r.code, ==, OK_DATA);
  g_assert_cmpint(r.data, ==, 234);
}

void test_get_id() {
  reset_buffer("GET /id HTTP/1.0\r\n\r\n");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);

  g_assert_cmpint(r.code, ==, OK_ID);
  g_assert_cmpstr(r.id, ==, "joe");
}
void test_get_not_found() {
  reset_buffer("GET / HTTP/1.0\r\n\r\n");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);

  g_assert_cmpint(r.code, ==, NOT_FOUND);
}

void test_syntax_method() {
  reset_buffer("GOT /id HTTP/1.0\r\n\r\n");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);

  g_assert_cmpint(r.code, ==, BAD_REQUEST);
}

void test_syntax_ws1() {
  reset_buffer("GET  /id HTTP/1.0\r\n\r\n");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);

  g_assert_cmpint(r.code, ==, BAD_REQUEST);
}

void test_syntax_eol() {
  reset_buffer("GET /id HTTP/1.0\r\n");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);

  g_assert_cmpint(r.code, ==, BAD_REQUEST);
}

void test_syntax_too_few() {
  reset_buffer("GET /id HTTP/1.0");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);

  g_assert_cmpint(r.code, ==, BAD_REQUEST);
}

void test_syntax_target_too_long() {
  // check max length first (20), then one too many
  reset_buffer("GET /bcdefghijklmnopqrst "
               "HTTP/1.0\r\n\r\nhello world!");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);

  g_assert_cmpint(r.code, ==, BAD_REQUEST);
}

void test_post_id() {
  reset_buffer("POST /id HTTP/1.0\r\n63\r\n");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);
  printf("r.code: %d\n", r.code);

  g_assert_cmpint(r.code, ==, BAD_REQUEST);
  // g_assert_cmpint(r.data, ==, 234);
}

void test_tokenizer() {
  reset_buffer("GET  /een_voldoende HTTP/1.0\r\n\r\n");
  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};
  struct token tok;
  tok = getNextToken(stream);

  // printf("TEST TOKEN tok.value: %s\n", tok.value);
  // printf("TEST TOKEN tok.type: %d\n", tok.type);
  g_assert_cmpint(tok.type, ==, WORD);
  g_assert_cmpstr(tok.value, ==, "GET");
  tok = getNextToken(stream);
  // printf("TEST TOKEN tok.value: %s\n", tok.value);
  // printf("TEST TOKEN tok.type: %d\n", tok.type);
  g_assert_cmpint(tok.type, ==, WS);
  g_assert_cmpstr(tok.value, ==, "  ");
  tok = getNextToken(stream);
  // printf("TEST TOKEN tok.value: %s\n", tok.value);
  // printf("TEST TOKEN tok.type: %d\n", tok.type);
  g_assert_cmpint(tok.type, ==, WORD);
  g_assert_cmpstr(tok.value, ==, "/een_voldoende");
}

void test_parser() {
  reset_buffer("GET  /een_voldoende HTTP/1.0\r\n\r\n");
  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};
  struct token tok;
  tok = getNextToken(stream);

  enum parserState state;
  struct request req = {METHOD_UNKNOWN, TARGET_UNKNOWN};
  state = parseNextToken(tok, EXPECT_METHOD, &req);
  g_assert_cmpint(state, ==, EXPECT_WS_1);
  
}

int main(int argc, char** argv) {
  g_test_init(&argc, &argv, NULL);

  test_tokenizer("GET  /een_voldoende HTTP/1.0\r\n\r\n",
                 test_tokenizer);

  test_parser("GET  /een_voldoende HTTP/1.0\r\n\r\n",
              test_parser);
  g_test_add_func("/request/test_get_data", test_get_data);

  // TODO zelf toevoegen
  g_test_add_func("/request/test_post_id", test_post_id);

  g_test_add_func("/request/test_get_id", test_get_id);
  g_test_add_func("/request/test_get_not_found",
                  test_get_not_found);

  g_test_add_func("/syntax/test_syntax_method",
                  test_syntax_method);
  g_test_add_func("/syntax/test_syntax_ws1",
                  test_syntax_ws1);
  g_test_add_func("/syntax/test_syntax_eol",
                  test_syntax_eol);
  g_test_add_func("/syntax/test_syntax_too_few",
                  test_syntax_too_few);
  g_test_add_func("/syntax/test_syntax_target_too_long",
                  test_syntax_target_too_long);

  return g_test_run();
}
