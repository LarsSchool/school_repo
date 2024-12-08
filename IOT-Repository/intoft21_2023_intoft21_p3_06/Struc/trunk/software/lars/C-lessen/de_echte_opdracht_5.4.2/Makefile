CFLAGS=-std=c99 -Wall `pkg-config --cflags glib-2.0` -save-temps

LDLIBS=`pkg-config --libs glib-2.0`

all: fmt check build clean

build: unittest
	./unittest

unittest: weer.o

fmt:
	clang-format -i *.c *.h

clean:
	-rm *.o
	-rm unittest
check:
	cppcheck -q --enable=all --inconclusive --std=c99 weer.h weer.c main.c
