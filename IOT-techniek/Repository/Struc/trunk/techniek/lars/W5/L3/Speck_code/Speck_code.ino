#include <stdint.h>

#define ROR(x, r) ((x >> r) | (x << (64 - r)))
#define ROL(x, r) ((x << r) | (x >> (64 - r)))
#define R(x, y, k) (x = ROR(x, 8), x += y, x ^= k, y = ROL(y, 3), y ^= x)
#define ROUNDS 32


struct TestVector
{
    const char *name;
    byte key[32];
    byte plaintext[16];
    byte ciphertext[16];
};

uint8_t plaintext[2] = {0x00, 0x11, 0x22, 0x33};
    // Example key (64-bit)
uint64_t key[2] = {(0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07),
                    (0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F)};
    // Variable to store ciphertext
uint8_t ciphertext[2] = {(0x69, 0xC4, 0xE0, 0xD8, 0x6A, 0x7B, 0x04, 0x30),
                    (0xD8, 0xCD, 0xB7, 0x80, 0x70, 0xB4, 0xC5, 0x5A)};
    
void setup() {
  DDRB = B11111111;
  // put your setup code here, to run once:
}

void loop() {
  PORTB=B100000;
  encrypt(ciphertext, plaintext, key);
  PORTB=B000000;
  delay(1000);
}

void encrypt(uint64_t ct[2],
             uint64_t const pt[2],            
             uint64_t const K[2])
{
   uint64_t y = pt[0], x = pt[1], b = K[0], a = K[1];

   R(x, y, b);
   for (int i = 0; i < ROUNDS - 1; i++) {
      R(a, b, i);
      R(x, y, b);
   }

   ct[0] = y;
   ct[1] = x;
}