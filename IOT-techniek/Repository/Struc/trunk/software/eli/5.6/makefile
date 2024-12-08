CFLAGS=-std=c99 -Wall

# dit is voor de libberations
LDLIBS=-lm

all: fmt chk build run clean

build: main

run: 
	./main

fmt: 
	clang-format -style='{PointerAlignment: Left}' -i *.c

clean:
	-rm main

chk:
	cppcheck --enable=all --inconclusive --std=c99 --quiet --suppress=missingIncludeSystem . 