CFLAGS=-std=c99 -Wall `pkg-config --cflags glib-2.0`

LDLIBS=`pkg-config --libs glib-2.0`

all: fmt check build clean

build: pointers
	valgrind ./pointers
	
fmt:
	clang-format -i *.c

clean: 
	-rm pointers
check:
	cppcheck -q --enable=all --inconclusive --std=c99 pointers.c
