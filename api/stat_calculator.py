import numpy as np
import scipy.stats as st


def fisher(A, B, ROC_optimal=True):
    """Calculating fisher exact test matrix and p-value

    Args:
        A : Group A
        B : Group B

    Returns:
        p, matrix: returns p value and matrix from fisher exact test.
    """
    if ROC_optimal:
        m = threshold(A, B)
    else:
        m = (np.median(A) + np.median(B))/2
    
    a = float(np.sum(A>m))
    b = float(np.sum(B>m))

    factorial = np.math.factorial

    matrix = [[a, b], [len(A)-a, len(B)-b]]

    nom = factorial(a+b)*factorial(len(A)-a + len(B)-b)*factorial(len(A))*factorial(len(B))
    div = factorial(a)*factorial(b)*factorial(len(A)-a)*factorial(len(B)-b)*factorial(len(A)+len(B))

    p = float(nom/div)

    return p, matrix


def threshold(A, B):
    """Calculating optimal threshold using ROC

    Args:
        A : Group A
        B : Group B
    """
    V = np.hstack((A, B))
    max_ = np.max(V)
    min_ = np.min(V)

    thresholds = np.linspace(min_, max_, len(V)*2)

    tpr_fpr = np.zeros((len(V)*2, 2))

    for i,t in enumerate(thresholds):
        A_ = A > t
        B_ = B > t

        # Vector with inverted tpr and normal fpr, to minimize to find best
        # threshold value to maximize nr of true positive and true negative
        tpr_fpr[i, :] = [1 - np.sum(A_)/len(A), np.sum(B_)/len(B)]
    
    m = np.argmin(np.linalg.norm(tpr_fpr, ord=2, axis=1))
    optimal_threshold = thresholds[m]

    return optimal_threshold


def mann_whitney(A, B, one_sided=False):
    """Performin Mann-Whitney U-test

    Args:
        A : Group A
        B : Group B
        one_sided (bool, optional): One-sided or two-sided test.

    Returns:
        [type]: [description]
    """
    if one_sided: 
        side="greater"
    else:
        side="two-sided"

    return st.mannwhitneyu(A, B, alternative=side)


def normality_test(A, B):

    V = np.hstack((A, B))
    
    return st.normaltest(V)