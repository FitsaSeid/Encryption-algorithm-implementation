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

console.log(hexaToBinary("fb"))

const binaryToHexa = (binary) => {
    return parseInt(binary, 2).toString(16).toUpperCase();
}

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

const matrixConstructor = (txt, isHex) => {
    let byte, hex;
    if (!isHex) {
        hex = textToHexa(txt);
        byte = slicer(hex, 2);
    } else {
        byte = slicer(txt, 2);
    }

    let matrix = Array.from({ length: 4 }, () => Array(4).fill(0))
    let slicedIndex = 0;
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix.length; y++) {
            matrix[y][x] = byte[slicedIndex];
            slicedIndex++;
        }
    }
    return matrix;
}

matrixConstructor("codingisawesomex", false)

const polynomialMultiplication = (hex1, hex2) => {
    let matrixElement1 = hexaToBinary(hex1);
    let matrixElement2 = hexaToBinary(hex2);

    matrixElement1 = slicer(matrixElement1, 1).map(Number);
    matrixElement2 = slicer(matrixElement2, 1).map(Number);

    const polynomial1 = matrixElement1.reverse();
    const polynomial2 = matrixElement2.reverse();

    // console.log(polynomial1)
    // console.log(polynomial2)

    let product = [];
    for (let x = 0; x < matrixElement1.length; x++) {
        if (polynomial1[x] === 1) {
            for (let y = 0; y < matrixElement2.length; y++) {
                if (polynomial2[y] === 1) {
                    product.push(x + y)
                }

            }
        }
    }
    //if the degree of the product polynomial greater than 7, the program need to multiply by irreducible polynomial
    let productInBinary = "";

    while (product[product.length - 1] > 7) {
        const irreduciblePolynomial = [4, 3, 1, 0];
        product.splice(product.length - 1);
        product = product.concat(irreduciblePolynomial);
        product = product.sort();
        for (let x in product) {
            if (product[x] === product[parseInt(x) + 1]) {
                product.splice(x, 2);
            }
        }
    }
    for (let x = 0; x < 8; x++) {
        if (product.indexOf(x) > -1)
            productInBinary += 1;
        else
            productInBinary += 0;
    }
    productInBinary = productInBinary.split("").reverse().join("");
    // console.log(product);
    console.log(productInBinary)
    return productInBinary
}


const matrix1 = [["fb", "9f", "ef", "a8"], ["85", "f5", "3c", "a8"], ["4d", "4d", "43", "f9"], ["bc", "f9", "8f", "8f"]]
const matrix2 = [["02", "03", "01", "02"], ["01", "02", "03", "01"], ["01", "01", "02", "03"], ["03", "01", "01", "02"]]

const matrixMultiplication = (matrix1, matrix2) => {
    let result = Array.from({ length: 4 }, () => Array(4).fill(0))

    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1.length; j++) {
            result[i][j] = "0";
            for (let k = 0; k < matrix2.length; k++) {
                result[i][j] = xor(result[i][j], polynomialMultiplication(matrix1[i][k], matrix2[k][j]));
            }
        }
    }
    for (let x = 0; x < result.length; x++) {
        for (let y = 0; y < result.length; y++) {
            result[y][x] = binaryToHexa(result[y][x])
        }
    }

    return result;
}

const xor = (binaryOne, binaryTwo) => {
    let result = "";
    if (binaryOne === "0") {
        return binaryTwo
    }
    else {
        for (let i = 0; i < binaryTwo.length; i++) {
            if (binaryOne.charAt(i) === binaryTwo.charAt(i))
                result += "0"
            else
                result += "1"
        }
        return result
    }
}


matrixMultiplication(matrix1, matrix2);
export { textToHexa, hexaToBinary, matrixConstructor, slicer }