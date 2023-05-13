import { hexaToBinary, slicer, binaryToHexa, xor } from "../tools/tools.js"
// const matrix = [["fb", "9f", "ef", "a8"], ["85", "f5", "3c", "a8"], ["4d", "4d", "43", "f9"], ["bc", "f9", "8f", "8f"]]


const polynomialMultiplication = (hex1, hex2) => {
    let matrixElement1 = hexaToBinary(hex1);
    let matrixElement2 = hexaToBinary(hex2);

    matrixElement1 = slicer(matrixElement1, 1).map(Number);
    matrixElement2 = slicer(matrixElement2, 1).map(Number);

    const polynomial1 = matrixElement1.reverse();
    const polynomial2 = matrixElement2.reverse();

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
    // console.log(product)
    while (product[product.length - 1] > 7) {
        const irreduciblePolynomial = [4, 3, 1, 0];

        let rem = product[product.length - 1] % 8;
        let newIrreduciblePolynomial = irreduciblePolynomial.map(val => val + rem)

        product.splice(product.length - 1);
        product = product.concat(newIrreduciblePolynomial);
        product = product.sort();
        // console.log(product)
        while (new Set(product).size !== product.length) {
            for (let x = 0; x < product.length; x++) {
                if (product[x] === product[parseInt(x) + 1]) {
                    product.splice(x, 2);
                }
            }
        }

    }
    // console.log(product)

    for (let x = 0; x < 8; x++) {
        if (product.indexOf(x) > -1)
            productInBinary += 1;
        else
            productInBinary += 0;
    }
    productInBinary = productInBinary.split("").reverse().join("");
    // console.log(productInBinary)
    return productInBinary
}

export const matrixMultiplication = (inputMatrix, constantMatrix) => {
    let result = Array.from({ length: 4 }, () => Array(4).fill(0))

    for (let i = 0; i < inputMatrix.length; i++) {
        for (let j = 0; j < inputMatrix.length; j++) {
            result[j][i] = "0";
            for (let k = 0; k < constantMatrix.length; k++) {
                result[j][i] = xor(result[j][i], polynomialMultiplication(constantMatrix[j][k], inputMatrix[k][i]));
            }
        }
    }
    for (let x = 0; x < result.length; x++) {
        for (let y = 0; y < result.length; y++) {
            if (binaryToHexa(result[y][x]).length === 1)
                result[y][x] = "0" + binaryToHexa(result[y][x]);
            else
                result[y][x] = binaryToHexa(result[y][x])
        }
    }

    return result;
}

