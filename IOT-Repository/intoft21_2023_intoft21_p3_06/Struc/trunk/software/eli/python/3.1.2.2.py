import random
import secrets

def run(val):
    print("value: ", val)
    
    
def temperature(val):
    if (val < 0):
        print("Freezing")
    elif (val >= 0 and val < 10):
        print("Very Cold")
    elif (val >= 10 and val < 20):
        print("Cold")
    elif (val >= 20 and val < 30):
        print("Normal")
    elif (val >= 30 and val < 40):
        print("Hot")
    elif (val >= 40):
        print("Very Hot")
    else:
        print("Invalid value")
    
    
def password_generator(charlength, specialchar, numbers):
    if(charlength % 2 == 0 & specialchar == false & numbers == true):
        return secrets.token_hex(charlength)
    if(charlength % 2 != 0 & specialchar == false & numbers == true):
        password = secrets.token_hex(charlength)
        return password[:-1]
    
def password_generator(val):
    pass


def birthday_paradox():
    pass
    
    
    
    
if __name__ == "__main__":
    print("What do you want to do? (t)emperature, password (g)enerator, password (c)hecker or (b)irthday paradox)")
    input = input()
    if(input == 't'):
        input("Enter a temperature: ")
        temperature(input)
    elif(input == 'g'):
        charlength = input("Character length:")
        if (charlength != 0):
            specialchar = input("Special characters (y/n):")
            if (specialchar =='y'):
                specialchar = True
            else:
                specialchar = False
            numbers = input("Numbers (y/n):")
            if (numbers == 'y'):
                numbers = True
            else:
                numbers = False
            password_generator(charlength, specialchar, numbers)
    elif(input == 'c'):
        pass
    elif(input == 'b'):
        pass
    else:
        print("Unknown command. Exiting.")