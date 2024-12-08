CFLAGS=-std=c99 -Wall `pkg-config --cflags glib-2.0`

LDLIBS=`pkg-config --libs glib-2.0`

all: fmt check build run clean

build: arrays
	./arrays
	
fmt:
	clang-format -i *.c

clean: 
	-rm arrays
check:
	cppcheck -q --enable=all --inconclusive --std=c99 arrays.c
