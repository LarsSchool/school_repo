#include "cbuff/circularbuffer.h"
#include <stdio.h>

#include <glib.h>
void buffer_init() {
cbuffer* b1 = cbInit(100, OVERWRITE_IF_FULL);
g_assert_true(b1);
g_assert_true(b1->data);
g_assert_cmpint(b1->size, ==, 100);
g_assert_cmpint(b1->start, ==, 0);
g_assert_cmpint(b1->count, ==, 0);
b1 = cbFree(b1);
g_assert_false(b1);
}
void buffer_add_overwrite() {
cbuffer* b = cbInit(3, OVERWRITE_IF_FULL);
int succes = cbAdd(b, 100);
g_assert_true(succes);
g_assert_cmpint(b->data[0], ==, 100);
succes = cbAdd(b, 200);
g_assert_true(succes);
g_assert_cmpint(b->data[1], ==, 200);
succes = cbAdd(b, 300);
g_assert_true(succes);
g_assert_cmpint(b->data[2], ==, 300);
succes = cbAdd(b, 400);
g_assert_true(succes);
g_assert_cmpint(b->data[0], ==, 400);
b = cbFree(b);
}
void buffer_add_ignore() {
cbuffer* b = cbInit(3, IGNORE_IF_FULL);
int succes = cbAdd(b, 100);
g_assert_true(succes);
g_assert_cmpint(b->data[0], ==, 100);
succes = cbAdd(b, 200);
g_assert_true(succes);
g_assert_cmpint(b->data[1], ==, 200);
succes = cbAdd(b, 300);
g_assert_true(succes);
g_assert_cmpint(b->data[2], ==, 300);
g_assert_cmpint(b->mode, ==, IGNORE_IF_FULL);
g_assert_cmpint(b->size, ==, 3);
g_assert_cmpint(b->count, ==, 3);
succes = cbAdd(b, 400);
g_assert_false(succes);
g_assert_cmpint(b->data[0], ==, 100);
b = cbFree(b);
}
void buffer_read_peek() {
cbuffer* b = cbInit(4, OVERWRITE_IF_FULL);
int succes;
cbtype val;
succes = cbAdd(b, 100);
g_assert_true(succes);
succes = cbAdd(b, 200);
g_assert_true(succes);
succes = cbAdd(b, 300);
g_assert_true(succes);
succes = cbAdd(b, 400);
g_assert_true(succes);
g_assert_cmpint(b->data[0], ==, 100);
g_assert_cmpint(b->data[1], ==, 200);
g_assert_cmpint(b->data[2], ==, 300);
g_assert_cmpint(b->data[3], ==, 400);
g_assert_cmpint(b->start, ==, 0);
g_assert_cmpint(b->count, ==, 4);
val = cbPeek(b);
g_assert_cmpint(val, ==, 100);
val = cbPeek(b);
g_assert_cmpint(val, ==, 100);
val = cbRead(b);
g_assert_cmpint(val, ==, 100);
val = cbRead(b);
g_assert_cmpint(val, ==, 200);
g_assert_cmpint(b->start, ==, 2);
g_assert_cmpint(b->count, ==, 2);
val = cbPeek(b);
g_assert_cmpint(val, ==, 300);
val = cbRead(b);
g_assert_cmpint(val, ==, 300);
g_assert_true(cbAvailable(b));
val = cbPeek(b);
g_assert_cmpint(val, ==, 400);
val = cbRead(b);
g_assert_cmpint(val, ==, 400);
g_assert_false(cbAvailable(b));
b = cbFree(b);
}
void buffer_add_overwrite_2() {
cbuffer* b = cbInit(3, OVERWRITE_IF_FULL);
int succes;
succes = cbAdd(b, 100);
g_assert_true(succes);
g_assert_cmpint(b->start, ==, 0);
g_assert_cmpint(b->count, ==, 1);
succes = cbAdd(b, 200);
g_assert_true(succes);
g_assert_cmpint(b->start, ==, 0);
g_assert_cmpint(b->count, ==, 2);
succes = cbAdd(b, 300);
g_assert_true(succes);
g_assert_cmpint(b->start, ==, 0);
g_assert_cmpint(b->count, ==, 3);
succes = cbAdd(b, 400);
g_assert_true(succes);
g_assert_cmpint(b->start, ==, 1);
g_assert_cmpint(b->count, ==, 3);
succes = cbAdd(b, 500);
g_assert_true(succes);
g_assert_cmpint(b->start, ==, 2);
g_assert_cmpint(b->count, ==, 3);
g_assert_cmpint(b->data[0], ==, 400);
g_assert_cmpint(b->data[1], ==, 500);
g_assert_cmpint(b->data[2], ==, 300);
b = cbFree(b);
}
void buffer_add_read() {
cbuffer* b = cbInit(5, OVERWRITE_IF_FULL);
int succes;
cbtype val;
succes = cbAdd(b, 100);
g_assert_true(succes);
g_assert_cmpint(b->data[0], ==, 100);
g_assert_cmpint(b->start, ==, 0);
g_assert_cmpint(b->count, ==, 1);
succes = cbAdd(b, 200);
g_assert_true(succes);
g_assert_cmpint(b->data[0], ==, 100);
g_assert_cmpint(b->data[1], ==, 200);
g_assert_cmpint(b->start, ==, 0);
g_assert_cmpint(b->count, ==, 2);
succes = cbAdd(b, 300);
g_assert_true(succes);
g_assert_cmpint(b->data[0], ==, 100);
g_assert_cmpint(b->data[1], ==, 200);
g_assert_cmpint(b->data[2], ==, 300);
g_assert_cmpint(b->start, ==, 0);
g_assert_cmpint(b->count, ==, 3);
val = cbRead(b);
g_assert_cmpint(val, ==, 100);
g_assert_cmpint(b->data[1], ==, 200);
g_assert_cmpint(b->data[2], ==, 300);
g_assert_cmpint(b->start, ==, 1);
g_assert_cmpint(b->count, ==, 2);
val = cbRead(b);
g_assert_cmpint(val, ==, 200);
g_assert_cmpint(b->data[2], ==, 300);
g_assert_cmpint(b->start, ==, 2);
g_assert_cmpint(b->count, ==, 1);
succes = cbAdd(b, 400);
g_assert_true(succes);
g_assert_cmpint(b->data[2], ==, 300);
g_assert_cmpint(b->data[3], ==, 400);
g_assert_cmpint(b->start, ==, 2);
g_assert_cmpint(b->count, ==, 2);
succes = cbAdd(b, 500);
g_assert_true(succes);
g_assert_cmpint(b->data[2], ==, 300);
g_assert_cmpint(b->data[3], ==, 400);
g_assert_cmpint(b->data[4], ==, 500);
g_assert_cmpint(b->start, ==, 2);
g_assert_cmpint(b->count, ==, 3);
val = cbRead(b);
g_assert_cmpint(val, ==, 300);
g_assert_cmpint(b->data[3], ==, 400);
g_assert_cmpint(b->data[4], ==, 500);
g_assert_cmpint(b->start, ==, 3);
g_assert_cmpint(b->count, ==, 2);
succes = cbAdd(b, 600);
g_assert_true(succes);
g_assert_cmpint(b->data[3], ==, 400);
g_assert_cmpint(b->data[4], ==, 500);
g_assert_cmpint(b->data[0], ==, 600);
g_assert_cmpint(b->start, ==, 3);
g_assert_cmpint(b->count, ==, 3);
val = cbRead(b);
g_assert_cmpint(val, ==, 400);
g_assert_cmpint(b->data[4], ==, 500);
g_assert_cmpint(b->data[0], ==, 600);
g_assert_cmpint(b->start, ==, 4);
g_assert_cmpint(b->count, ==, 2);
val = cbRead(b);
g_assert_cmpint(val, ==, 500);
g_assert_cmpint(b->data[0], ==, 600);
g_assert_cmpint(b->start, ==, 0);
g_assert_cmpint(b->count, ==, 1);
g_assert_true(cbAvailable(b));
val = cbRead(b);
g_assert_cmpint(val, ==, 600);
g_assert_cmpint(b->start, ==, 1);
g_assert_cmpint(b->count, ==, 0);
g_assert_false(cbAvailable(b));
b = cbFree(b);
g_assert_false(b);
}

int main(int argc, char** argv) {
g_test_init(&argc, &argv, NULL);
g_test_add_func("/buffer/init", buffer_init);
g_test_add_func("/buffer/add/overwrite",
buffer_add_overwrite);
g_test_add_func("/buffer/add/overwrite/2",
buffer_add_overwrite_2);
g_test_add_func("/buffer/add/ignore", buffer_add_ignore);
g_test_add_func("/buffer/read/peek", buffer_read_peek);
g_test_add_func("/buffer/add/read", buffer_add_read);
return g_test_run();
}
