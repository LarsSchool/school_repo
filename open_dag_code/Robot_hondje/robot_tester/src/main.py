import os
import machine

from lib.xgo import UARTWrapper
from lib.xgo import XGO
# from lib.lightgrove import LightGrove # Import the TSL2561 class from your library file
from lib.ultrasonic import UltrasonicI2C
from lib.humandetect import *
from lib.heartrate import Heartrate
from lib.lightadafruit import LightAda

#program start and get free space
##########################################################
print ("hello from the pico 2 w")

stat = os.statvfs('/')

print(stat)
print(f"Total: {stat[2] * stat[1]} B")
print(f"Used: {((stat[2] * stat[1]) - (stat[4] * stat[1])) } B")
print(f"Free: {stat[4] * stat[1]} B")

time.sleep(30)

#start Xgo communication and send squat command
##########################################################
dog = None
uart_comm = None

try:
    uart_comm = UARTWrapper(uart_num=0, baudrate=115200, tx=0, rx=1)

    # 2. Pass the wrapper to the XGO class
    dog = XGO(comm_interface=uart_comm, version='xgomini')

    # 3. Use the dog object as before
    #    (Note: utime is imported as time in the script)
    print("Reading battery...")
    battery = dog.read_battery()
    print("Battery: {}%".format(battery))

    print("Reading XGO firmware...")
    firmware_version = dog.read_firmware()
    print("Firmware: {}".format(firmware_version))
    time.sleep_ms(5000)
    dog.action(6) # Stand up
    time.sleep_ms(5000)
    dog.reset()   # Sit down

    # uart_comm.close()

except Exception as e:
    print("An error occurred: {}".format(e))


# --- Sensor Initialization ---
# Initialize the sensor.
# Arguments: i2c_id, scl_pin_num, sda_pin_num, freq (optional), address (optional)

try:

    _i2c0 = machine.I2C(0, scl=machine.Pin(5), sda=machine.Pin(4), freq=100000)
    _i2c1 = machine.I2C(1, scl=machine.Pin(3), sda=machine.Pin(2), freq=100000)

    # Initialize ADC2 on the Raspberry Pi Pico.
    # This corresponds to GPIO 28.
    # You can use either machine.ADC(2) or machine.ADC(machine.Pin(28))
    light_front = machine.ADC(2)

    # light = LightGrove(_i2c0)  # Creates I2C bus for Light sensor

    ultrasonics = UltrasonicI2C(_i2c1) # Creates I2C bus for distance sensor

    # uart_1 = UART(1, baudrate=9600, tx=Pin(4), rx=Pin(5), timeout=1000)
    # human_detection = DFRobot_C4001_UART(uart_1)

    # human_detection = DFRobot_C4001_I2C(_i2c0, 0x2A)
    
    # 4. Set the sensor to start measuring in Existence Detection Mode
    # print("Setting sensor to Existence Detection Mode and starting...")
    # human_detection.set_sensor_mode(EXIST_MODE)
    # print("Sensor started.")
    # time.sleep(1)  # Wait a moment for the sensor to stabilize

    # Optional: Change gain/integration time (default is 1x gain, 402ms)
    # sensor.set_gain_integration_time(sensor.TSL2561_GAIN_HIGH_MEDIUM) # Example: 16x gain, 101ms

    heart_rate = Heartrate(_i2c0)
    light2 = LightAda(_i2c0, 0x23)
    light3 = LightAda(_i2c0, 0x5C)

except OSError as e:
    print(f"Failed to initialize TSL2561 sensor: {e}")
    print("Please check wiring, power, and I2C address.")
    while True:  # Stop execution if sensor isn't found
        time.sleep(1)

# --- Main Loop to Read Data ---

while True:
    try:

        # read distance sensor
        print("\n----------------Distance sensor reading----------------")
        distance_mm = ultrasonics.read()
        print(f"Distance: {distance_mm} millimeters ({round(distance_mm / 10, 1)} centimeters)")
        time.sleep(1)
        ############################################################

        # read light sensor
        # print("\n----------------light sensor 1 reading----------------")
        # full_channel, infrared_channel = light.read_channels()
        #
        # print(f"Full Channel (Ch0): {full_channel}")
        # print(f"Infrared Channel (Ch1): {infrared_channel}")
        #
        # if full_channel > 0:
        #     lux = light.calculate_flux(infrared_channel, full_channel)
        #     print(f"Approx. Lux: {lux:.2f}")
        # else:
        #     print("Full channel is zero, cannot calculate Lux.")

        # read_u16() reads the analog value and scales it to a
        # 16-bit range (0-65535), regardless of the ADC's
        # actual bit depth. This is the standard, portable way.
        light_f = light_front.read_u16()

        # A higher value typically means more light
        print(f"Light Value front: {light_f}")
        
        ############################################################

        ############################################################

        # read human_detection sensor
        # print("\n----------------Human sensor reading----------------")
        # # sleep(1)
        # presence_value = human_detection.motion_detection()
        # sleep(1)
        # if presence_value == 1:
        #     print("Result: Target Detected!")
        # else:
        #     print("Result: No Target.")

        ############################################################

        ############################################################

        # read heartrate sensor
        print("\n----------------heart sensor reading----------------")
        rate = heart_rate.read_heart_rate()
        if rate is not None:
            print(f"Heart Rate: {rate}")
        else:
            print("No heart rate.")
        print("-" * 20)

        ############################################################

        ############################################################

        # read light sensor ada
        print("\n------------------light sensor 2 reading---------------")
        lux1 = light2.luminance(LightAda.CONT_HIRES_1)
        lux2 = light3.luminance(LightAda.CONT_HIRES_1)
        print("Luminance: {:.2f} lux1".format(lux1), "{:.2f} lux2".format(lux2))

        if distance_mm < 100:
            dog.action(6)
            time.sleep(1)
            print("Squat from minimal distance detected, dog squats.: ", distance_mm)
        else:
            print("No minimal distance detected, dog standing: ", distance_mm)


    except OSError as e:
        pass
        # print(f"Error reading from TSL2561: {e}")
        # Consider re-initializing or gracefully handling the error

    time.sleep(1)
