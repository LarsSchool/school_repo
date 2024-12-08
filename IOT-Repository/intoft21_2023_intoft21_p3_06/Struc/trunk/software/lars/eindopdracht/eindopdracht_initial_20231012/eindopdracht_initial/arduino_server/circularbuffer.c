#include "circularbuffer.h"
#include <stdio.h>
#include <stdlib.h>

cbuffer* cbInit(int8_t size, enum cbmode mode) {
  cbuffer* buffer = malloc(sizeof(cbuffer));
  if (!buffer) {
    return NULL;
  }
  buffer->data = malloc(sizeof(cbtype) * size);
  if (buffer->data == NULL) {
    free(buffer);
    return NULL;
  }
  buffer->mode = mode;
  buffer->size = size;
  buffer->start = 0;
  buffer->count = 0;

  return buffer;
}

cbuffer* cbFree(cbuffer* buffer) {
  free(buffer->data);
  free(buffer);
  return NULL;
}

int cbAvailable(cbuffer* buffer) {
  if (buffer->count > 0) {
    return 1;
  }
  return 0;
}

cbtype cbPeek(cbuffer* buffer) {
  if (cbAvailable(buffer) != 0) {
    return buffer->data[buffer->start];
  }
  printf("Error 418: not available\n");
  return 0;
}

cbtype cbRead(cbuffer* buffer) {
  if (cbAvailable(buffer) != 0) {
    cbtype temp = buffer->data[buffer->start];
    --buffer->count;
    buffer->start = (buffer->start + 1) % buffer->size;
    return temp;
  }
  printf("Error 418: not available\n");
  return 0;
}

int8_t cbAdd(cbuffer* buffer, cbtype value) {
  if (buffer->count < buffer->size) {
    buffer->data[(buffer->count + buffer->start) %
                 buffer->size] = value;
    buffer->count++;
    return 1;
  } else if (buffer->mode == OVERWRITE_IF_FULL) {
    buffer->data[buffer->start] = value;
    buffer->start = (buffer->start + 1) % buffer->size;
    return 1;
  }
  return 0;
}

cbtype cbGetActual(cbuffer* buffer) {
  if (buffer->size == 0 || buffer->count == 0) {
    return -1;
  }

  double returnValue = 0.000000;
  // Deze count heb ik voor de zekerheid toegevoegd, voor
  // als voor een of andere reden de count van de CB niet
  // goed geüpdate is, waardoor door stabieler is.
  // -25/03/2024
  int8_t count = 0;

  while (cbAvailable(buffer) == 1) {
    double value = cbRead(buffer);
    returnValue = returnValue + value;
    ++count;
  }
  return returnValue / count;
}

void cbReset(cbuffer* buffer) {
  buffer->count = 0;
  buffer->start = 0;
}
