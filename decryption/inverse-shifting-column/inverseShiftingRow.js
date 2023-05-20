export const shiftingRow = (subPlain) => {
    let row1 = [], row2 = [], row3 = [];
    row1.push(subPlain[1].slice(3, 4))
    subPlain[1] = [...row1[0], ...subPlain[1].slice(0, 3)]

    row2.push(subPlain[2].slice(2, 4))
    subPlain[2] = [...row2[0], ...subPlain[2].slice(0, 2)]

    row3.push(subPlain[3].slice(1, 4))
    subPlain[3] = [...row3[0], ...subPlain[3].slice(0, 1)]

    return subPlain;
}
