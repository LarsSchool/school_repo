from time import sleep
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(21, GPIO.OUT)
try:
	while True:
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.HIGH)
		GPIO.output(21, GPIO.LOW)
		GPIO.output(21, GPIO.LOW)
		GPIO.output(21, GPIO.LOW)
		GPIO.output(21, GPIO.LOW)
		GPIO.output(21, GPIO.LOW)
		GPIO.output(21, GPIO.LOW)
		GPIO.output(21, GPIO.LOW)
		GPIO.output(21, GPIO.LOW)
		GPIO.output(21, GPIO.LOW)
		GPIO.output(21, GPIO.LOW)
finally:
	GPIO.cleanup()
