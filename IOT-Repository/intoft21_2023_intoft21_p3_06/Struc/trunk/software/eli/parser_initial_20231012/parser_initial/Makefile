CFLAGS=-std=c99 -Wall `pkg-config --cflags glib-2.0` -D NDEBUG
LDLIBS=`pkg-config --libs glib-2.0` -lm

# Deze code hoort bij de parseropdracht. Het is een gedeeltelijke
# implementatie die werkt. De codekwaliteit is echter onvoldoende.
#
# Dit project lijkt sterk op het uitgangspunt voor de eindopdracht die
# je later uitgereikt krijgt. Een deel van het assessment van de
# eindopdracht is geautomatiseerd. Je code werkt alleen dan wanneer
# je aan de structuur niet veranderd. (Toevoegingen zijn prima.)
#
# Voor het assessment is het essentieel dat:
#
# 1. de code zonder waarschuwing compileert
# 2. cppcheck geen waarschuwingen geeft
# 3. de integratietest foutloos draait
# 4. de acceptatietests op Arduino en Raspberry foutloos draaien
#
# Bovenstaande vier punten moet zonder aanpassing aan deze Makefile
# ook gelden wanneer de integratietest en acceptatietests vervangen worden.

# your configuration:

arduino_IP=192.168.1.21
rpi_IP=192.168.1.1

object_files=$(project)/cserver.o buffermock.o

# do not change:

project=arduino_server
unittest=integration_test
arduinotest=acceptation_test_arduino.py
rpitest=acceptation_test_rpi.py
virtualEnvironment = virtEnv

.PHONY: test_c_code arduino rpi fmt check prepare accept_arduino accept_rpi clean

test_c_code: check fmt clean

# needs a running server on Arduino on $(arduino_IP)
arduino: prepare fmt accept_arduino 

# eventually needs a running server on RPi on $(rpi_IP)
rpi: prepare fmt accept_rpi


$(unittest): $(object_files)

fmt:
	clang-format -style='{PointerAlignment: Left, ColumnLimit: 60}' -i $(project)/*.c $(project)/*.h $(project)/*.ino
	clang-format -style='{PointerAlignment: Left, ColumnLimit: 60}' -i *.c *.h
	autopep8 -i *.py

check: $(unittest)
	cppcheck -q --enable=all --inconclusive --std=c99 $(project)/
	./$(unittest)

# bar limits check to availability, no timestamp check performed
prepare: | $(virtualEnvironment)

$(virtualEnvironment):
	python3 -m venv $(virtualEnvironment)
	./$(virtualEnvironment)/bin/pip3 install pytest
	./$(virtualEnvironment)/bin/pip3 install requests
	./$(virtualEnvironment)/bin/pip3 install --force-reinstall -v "requests-raw==1.0.1"

accept_arduino:
	arduino=$(arduino_IP) ./$(virtualEnvironment)/bin/pytest $(arduinotest)

accept_rpi:
	rpi=$(rpi_IP) ./$(virtualEnvironment)/bin/pytest $(rpitest)

clean:
	-rm *.o $(project)/*.o
	-rm -rf $(unittest).dSYM/
	-rm $(unittest)
	-rm -rf __pycache__/
	-rm -rf .pytest_cache/
	-rm -rf $(virtualEnvironment)

