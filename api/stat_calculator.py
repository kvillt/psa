import numpy as np

def fisher(A, B):

    m = (np.median(A) + np.median(B))/2
    
    a = float(np.sum(A>m))
    b = float(np.sum(B>m))

    factorial = np.math.factorial

    matrix = [[a, b], [len(A)-a, len(B)-b]]

    nom = factorial(a+b)*factorial(len(A)-a + len(B)-b)*factorial(len(A))*factorial(len(B))
    div = factorial(a)*factorial(b)*factorial(len(A)-a)*factorial(len(B)-b)*factorial(len(A)+len(B))

    p = float(nom/div)

    return p, matrix
