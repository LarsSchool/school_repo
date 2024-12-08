import foo


def bar():
    print("this is bar")


def run(v):
    print("Value: {}".format(v))


if __name__ == "__main__":
    #    bar()
    #    print("bar calls foo:")
    #    foo.foo()
    v = input("Give me a value: ")
    run(v)
