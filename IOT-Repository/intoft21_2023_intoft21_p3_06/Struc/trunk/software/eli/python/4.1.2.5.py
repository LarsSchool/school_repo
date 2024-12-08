import numpy as np
a = np.array([[5, 5], [1, 5]])
print("2x2 matrix:")
print(a)
b = np.array([[1, 2, 3, 4]])
print("1x4 matrix:")
print(b)
c = np.array([[5, 6, 7, 8]])
print("another 1x4 matrix:")
print(c)
d = np.concatenate((b, c))
print("combine two 1x4 matrices into a 2x4 matrix:")
print(d)
e = np.concatenate((np.power(b, 0), np.power(b, 1), np.power(b, 2)))
print("combine variations of b into a 3x4 matrix:")
print(e)
# matrix operaties
print("add:")
f = b + c
print(f)
print("multiply (mind the operator):")
g = a @ d
print(g)
print("transpose:")
h = np.transpose(e)
print(h)
print("matrix inverse:")
i = np.linalg.inv(a)
print(i)





