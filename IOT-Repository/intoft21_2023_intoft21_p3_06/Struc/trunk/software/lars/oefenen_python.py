def function1(getal1, getal2):
    if getal1 * getal2 <= 1000:
        return getal1 * getal2
    else:
        return getal1 + getal2
    

# # first condition
# result = function1(20, 30)
# print("The result is", result)

# # Second condition
# result = function1(40, 30)
# print("The result is", result)

# previousNum = 0
# for i in range(0,10):
#     sum = previousNum + i
#     print("Current number: ", i, " - Previous number: ", previousNum, " - Sum: ", sum)
#     previousNum = i


def first_last_same(list):
    print("currentList: ", list)

    firstNum = list[0]
    lastNum = list[-1]

    if firstNum == lastNum:
        return True
    else: 
        return False


# numbers_x = [15, 20, 30, 40, 14]
# print("result is", first_last_same(numbers_x))

# numbers_y = [75, 65, 35, 75, 30]
# print("result is", first_last_same(numbers_y))



def function1(lijst):
    best = 1
    for vak, cijfer in lijst.items():
        if cijfer > best:
            print("LADIES AND GENTLEMEN, WE HAVE A NEW WINNER!!!!",  cijfer, " > ", best, ".")
            best = cijfer

def function2(lijst):
    best = 1
    for vak, cijfer in lijst.items():
        print("HEEEELEP", best)
        best += 1

function1({'wi': 7, 'na': 8, 'sk': 6, 'MOE' : 9})