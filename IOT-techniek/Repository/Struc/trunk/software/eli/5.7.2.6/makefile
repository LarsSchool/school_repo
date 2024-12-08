CFLAGS=-std=c99 -Wall
VALGRIND_FLAGS = --leak-check=full --show-leak-kinds=all -v
# dit is voor de libberations
LDLIBS=-lm

all: fmt chk build run clean

build: main
	valgrind ./main 

run: 
	./main

fmt: 
	clang-format -style='{PointerAlignment: Left}' -i *.c

clean:
	-rm main

chk:
	cppcheck --enable=all --inconclusive --std=c99 --quiet --suppress=missingIncludeSystem . 

# valgrind:
# 	valgrind --leak-check=full ./main