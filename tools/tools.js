const textToHexa = (text) => {
    let arr1 = [];
    for (let x = 0; x < text.length; x++) {
        let hex = Number(text.charCodeAt(x)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}

const hexaToBinary = (hexa) => {
    return (parseInt(hexa, 16).toString(2)).padStart(8, '0');
}

// console.log(hexaToBinary("01") + hexaToBinary("01"))
const slicer = (text, n) => {
    let length = text.length;
    let flag = 0;
    let slicedText = [];
    while (flag < length) {
        let sliced = text.slice(flag, flag + n);
        slicedText.push(sliced);
        flag += n;
    }
    return slicedText;
}

let hex = textToHexa("codingisawesomex");
let sli = slicer(hex, 2)

const matrixConstructor = (hex) => {
    let matrix = Array.from({ length: 4 }, () => Array(4).fill(0))
    let slicedIndex = 0;
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix.length; y++) {
            matrix[y][x] = hex[slicedIndex];
            slicedIndex++;
        }
    }
    console.log(matrix)
    return matrix;
}

matrixConstructor(sli)




export { textToHexa, hexaToBinary, matrixConstructor, slicer }