export function findIndex (array, predicate) {
    const length = array.length;

    for (let i = 0; i < length; i++) {
        if (predicate(array[i]))
            return i;
    }

    return -1;
}
