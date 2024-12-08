#include <stdio.h>
#include <pigpio.h>
#include <unistd.h> // For sleep()

#define LED_PIN 17 // GPIO pin number of the LED

int main() {
    if (gpioInitialise() < 0) {
        fprintf(stderr, "pigpio initialization failed\n");
        return 1;
    }

    // Set the GPIO pin to be an output
    gpioSetMode(LED_PIN, PI_OUTPUT);

    // Blink the LED
    for (int i = 0; i < 10; ++i) {
        // Turn the LED on
        gpioWrite(LED_PIN, 1);

        // Turn the LED off
        gpioWrite(LED_PIN, 0);
        sleep(1); // Wait for 1 second
    }

    // Cleanup and terminate pigpio
    gpioTerminate();

    return 0;
}
