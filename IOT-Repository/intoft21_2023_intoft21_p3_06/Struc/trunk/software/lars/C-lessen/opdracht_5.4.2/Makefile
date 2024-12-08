CFLAGS=-std=c99 -Wall `pkg-config --cflags glib-2.0` 

# "lm" is nodig om de Math library the kunnen includen.
LDLIBS=-lm `pkg-config --libs glib-2.0`

SRC=main.c weer.h weer.c

all: chk fmt test build run clean

build: main

main: weer.o

test: unittest

unittest: weer.o

#weer:
#	 gcc -std=c99 -Wall pkg-config --cflags glib-2.0 -c -o weer.c weer.o

run: 
	./main
	-./unittest

fmt:
	clang-format -style='{PointerAlignment: Left}' -i *.c *.h

clean:
	-rm unittest
	-rm main
	-rm *.o

chk:
	cppcheck --enable=all --inconclusive --std=c99 --quiet --suppress=missingIncludeSystem $(SRC)
