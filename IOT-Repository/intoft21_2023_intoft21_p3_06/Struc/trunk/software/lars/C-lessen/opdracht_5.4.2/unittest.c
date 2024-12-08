#include "weer.h"
#include <glib.h>
#include <stdio.h>
void test_1() {
  Verwachting v = {.neerslag = 22, .temperatuur = 38.0, .windkracht = 6};
  Code c = waarschuwing(v);
  g_assert_cmpint(c, ==, ROOD);
}
void test_2() {
  Verwachting v = {.neerslag = 42, .temperatuur = 18.0, .windkracht = 2};
  Code c = waarschuwing(v);
  g_assert_cmpint(c, ==, GEEL);
}
void test_3() {
  Verwachting v = {.neerslag = 0, .temperatuur = 25.0, .windkracht = 2};
  Code c = waarschuwing(v);
  g_assert_cmpint(c, ==, GROEN);
}
void test_4() {
  Verwachting v = {.neerslag = 22, .temperatuur = 38.0, .windkracht = 6};
  Code c = waarschuwing(v);
  89 if (g_test_subprocess()) {
    bericht(c, v);
    return;
  }
  g_test_trap_subprocess(NULL, 0, 0);
  g_test_trap_assert_stdout("!! Weeralarm: neerslag: 22 mm, temperatuur: 38.0 "
                            "celsius, windkracht: 6\n");
}
void test_5() {
  Windkracht w = 8;
  Verwachting v = {.neerslag = 18, .temperatuur = 16.0, .windkracht = w};
  g_assert_cmpint(sizeof(v.windkracht), ==,
                  1); // altijd en overal!
}
int main(int argc, char** argv) {
  g_test_init(&argc, &argv, NULL);
  g_test_add_func("/test/1", test_1);
  g_test_add_func("/test/2", test_2);
  g_test_add_func("/test/3", test_3);
  g_test_add_func("/test/4", test_4);
  g_test_add_func("/test/5", test_5);
  return g_test_run();
}
