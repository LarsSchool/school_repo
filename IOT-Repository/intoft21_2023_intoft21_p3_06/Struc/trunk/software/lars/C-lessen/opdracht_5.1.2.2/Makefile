CFLAGS=-std=c99 -Wall -D NDEBUG

#Deze is nodig om de Math library the kunnen includen.
LDLIBS=-lm

all: chk fmt build run clean

build: main

main: weer.o

run: 
	./main

fmt:
	clang-format -style='{PointerAlignment: Left}' -i *.c *.h

clean:
	-rm main
	-rm weer.o

chk:
	cppcheck --enable=all --inconclusive --std=c99 --quiet --suppress=missingIncludeSystem .
