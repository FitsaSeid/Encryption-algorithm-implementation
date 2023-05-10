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

    console.log()
    matrixElement1 = slicer(matrixElement1, 1).map(Number);
    matrixElement2 = slicer(matrixElement2, 1).map(Number);

    const polynomial1 = matrixElement1.reverse();
    const polynomial2 = matrixElement2.reverse();

    console.log(polynomial1)
    console.log(polynomial2)

    let product = [];
    for (let x = 0; x < matrixElement1.length; x++) {
        if (polynomial1[x] === 1) {
            for (let y = 0; y < matrixElement2.length; y++) {
                if (polynomial2[y] === 1) {
                    product.push(x + y)
                    console.log(product)
                }

            }
        }
    }
    //if the degree of the product polynomial greater than 7, the program need to multiply by irreducible polynomial
    let productInBinary = [];

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
            productInBinary.push(1);
        else
            productInBinary.push(0);
    }
    productInBinary = productInBinary.reverse();
    console.log(product);
    console.log(productInBinary)
}

polynomialMultiplication("fb", "02");

export { textToHexa, hexaToBinary, matrixConstructor, slicer }