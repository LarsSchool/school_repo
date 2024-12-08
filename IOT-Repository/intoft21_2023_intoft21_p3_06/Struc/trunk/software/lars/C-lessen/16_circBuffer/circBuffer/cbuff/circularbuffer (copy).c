#include "circularbuffer.h"
#include <stdio.h>
#include <stdlib.h>

cbuffer *cbInit(int8_t size, enum cbmode mode) {
  cbuffer *buffer = malloc(sizeof(cbuffer));
  if (!buffer) {
    return NULL;
  }
  buffer->data = calloc(sizeof(unsigned long), size);
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

cbuffer *cbFree(cbuffer *buffer) {
  free(buffer->data);
  free(buffer);
  return NULL;
}

int cbAvailable(cbuffer *buffer) {
  if (buffer->count > 0) {
    return 1;
  }
  return 0;
}

cbtype cbPeek(cbuffer *buffer) {
  if (cbAvailable(buffer) != 0) {
    return buffer->data[buffer->start];
  }
  printf("Error 418: not available\n");
  return 0;
}

cbtype cbRead(cbuffer *buffer) {
  if (cbAvailable(buffer) != 0) {
    cbtype temp = buffer->data[buffer->start];
    buffer->data[buffer->start] = 0;
    --buffer->count;
    buffer->start = (buffer->start + 1) % buffer->size;
    return temp;
  }
  printf("Error 418: not available\n");
  return 0;
}

// Excuses voor deze code, hij is 's avonds laat geschreven.

int8_t cbAdd(cbuffer *buffer,
             cbtype value) { // Ga in de if loop als je moet overwriten of
                             // ignoren, omdat je buffer vol zit.
  if (buffer->count == buffer->size) {
    if (buffer->mode != OVERWRITE_IF_FULL) { // Als je hier komt met een ignore
                                             // buffer, mag je gelijk weer weg.
      printf("JE BUFFER ZIT VOL JIJ IDIOOT, CONTROLEER JE COMMANDO'S "
             "BETER!!!!!\n");
      return 0;
    }
    buffer->data[buffer->start] = value;
    buffer->start = (buffer->start + 1) % buffer->size;

  } else if (buffer->data[buffer->size - 1] !=
             0) { // Als de buffer niet vol zit, controleer dan of alle waardes
                  // 1 keer ingevuld zijn.

    int16_t locatie; // Dit is een bewuste variabele, want anders heb je 3 keer
                     // zo veel code nodig en dit is overzichtelijker.
    if (buffer->start + buffer->count >
        buffer->size - 1) { // Als start + count groter is dan de size, begin
                            // dan weer bij 0.
      locatie = 0;
    }
    if (buffer->data[locatie] != 0) { // Alleen als de locatie die je overwrite
                                      // gevuld is moet de start 1 opschuiven.
      buffer->start = (buffer->start + 1) % buffer->size;
    }
    buffer->data[locatie] = value;
    ++buffer->count;
  } else { // En anders doe gewoon de standaard procedure.
    buffer->data[buffer->start + buffer->count] = value;
    ++buffer->count;
  }
  return 1;
}
