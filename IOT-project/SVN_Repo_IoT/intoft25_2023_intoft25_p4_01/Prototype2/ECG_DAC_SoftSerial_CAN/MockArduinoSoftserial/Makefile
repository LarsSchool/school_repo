SRC=  *.ino

chk:
	cppcheck --enable=all --inconclusive --std=c++11 --suppress=missingIncludeSystem $(SRC)

fmt:
	clang-format -style='{PointerAlignment: Left}' -i $(SRC)

