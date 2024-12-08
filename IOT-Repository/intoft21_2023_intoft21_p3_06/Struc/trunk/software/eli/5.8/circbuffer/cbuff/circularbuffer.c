#include "./circularbuffer.h"
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {}

cbuffer *cbInit(int8_t size, enum cbmode mode) {

  cbuffer *buffer = malloc(size * sizeof(cbuffer));
  if (buffer == NULL) {
    return NULL;
  }
  buffer->data = malloc(sizeof(unsigned long) * size);
  if (buffer->data == NULL) {
    free(buffer);
    return NULL;
  }

  buffer->size, buffer->mode, buffer->start, buffer->count = size, mode, 0, 0;
  return buffer;
}
/**
 * free the buffer, a new buffer can be created
 * instead.
 *
 * cbFree returns NULL to allow for b = cbFree(b);
 */
cbuffer *cbFree(cbuffer *buffer) {
  free(buffer->data);
  free(buffer);
  return NULL;
}
/**
 * check whether data van be read from the buffer
 */
int cbAvailable(cbuffer *buffer) {
  if (buffer->count == 0) {
    return 0;
  } else {
    return 1;
  }
}
/**
 * peek the oldest value in the buffer, value
 * remains available for read.
 */
cbtype cbPeek(cbuffer *buffer) {
  if (cbAvailable(buffer) == 0) {
    return 0;
  } else {
    return buffer->data[buffer->start];
  }

} /**
   * read and remove the oldest value in the buffer.
   */
cbtype cbRead(cbuffer *buffer) {
  if (cbAvailable(buffer) == 0) {
    return 0;
  } else {
    cbtype temp = buffer->data[buffer->start];
    buffer->start = (buffer->start + 1) % buffer->size;
    buffer->count--;
    return temp;
  }
}
/**
 * add a new value to the buffer, adding may
 * fail depending on the buffer mode.
 */
int8_t cbAdd(cbuffer *buffer, cbtype value) {

  if (buffer->mode == IGNORE_IF_FULL) {
    if (buffer->count < buffer->size) {
      buffer->data[(buffer->start + buffer->count) % buffer->size] = value;
      buffer->count++;
      return 1;
    } else {
      return 0;
    }
  } else if (buffer->mode == OVERWRITE_IF_FULL) {
    if (buffer->count <= buffer->size) {
      buffer->data[buffer->start] = value;
      buffer->start = (buffer->start + 1) % buffer->size;
    }
  }
}