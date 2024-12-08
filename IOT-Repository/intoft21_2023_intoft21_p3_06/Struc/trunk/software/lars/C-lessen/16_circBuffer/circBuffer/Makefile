CFLAGS=-std=c99 -Wall `pkg-config --cflags glib-2.0`

LDLIBS=`pkg-config --libs glib-2.0`

all: fmt check build clean

build: cbuff/circularbuffer.o unittests
	valgrind ./unittests

cbuff/circularbuffer.o: cbuff/circularbuffer.c cbuff/circularbuffer.h

unittests: unittests.c cbuff/circularbuffer.o

fmt:
	clang-format -i cbuff/circularbuffer.c cbuff/circularbuffer.h

clean:
	rm cbuff/circularbuffer.o
	rm unittests

check:
	cppcheck -q --enable=all --inconclusive --std=c99 cbuff/circularbuffer.c cbuff/circularbuffer.h

