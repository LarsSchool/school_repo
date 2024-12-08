CFLAGS=-std=c99 -Wall

#Deze is nodig om de Math library the kunnen includen.
LDLIBS=-lm

all: chk fmt build run clean

build: main

run: 
	./main

fmt:
	clang-format -style='{PointerAlignment: Left}' -i *.c *.h

clean:
	-rm main

chk:
	cppcheck --enable=all --inconclusive --std=c99 --quiet --suppress=missingIncludeSystem .
