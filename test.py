n = 6
flag = True
while flag:
    x = 900 / (-2 + n)
    if isinstance(x, int):
        print(x)
        print("THIS IS IT^^^")
        break
    n += 1
    print(isinstance(x, int))
