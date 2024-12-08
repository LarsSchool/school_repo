#include "arduino_server/cserver.h"
#include "buffermock.h"
#include <glib.h>

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

void test_opdracht_2_3() {
  reset_buffer("POST /data HTTP/1.0\r\n\r\n63");

  struct stream stream = {.available = available_buffer,
                          .peek = peek_buffer,
                          .read = read_buffer};

  struct response r = handleRequest(stream);

  g_assert_cmpint(r.code, ==, POST_DATA);
  g_assert_cmpint(r.data, ==, 63);
}

int main(int argc, char** argv) {
  g_test_init(&argc, &argv, NULL);

  g_test_add_func("/request/test_get_data", test_get_data);
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

  g_test_add_func("/opdrachten/opdracht_2_3",
                  test_opdracht_2_3);

  return g_test_run();
}
