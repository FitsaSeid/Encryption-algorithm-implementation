import { constantMatrix } from "../tools/sbox.js";
import { hexaToBinary, slicer, binaryToHexa, xor, xors, matrixConstructor } from "../tools/tools.js"
// const matrix = [["fb", "9f", "ef", "a8"], ["85", "f5", "3c", "a8"], ["4d", "4d", "43", "f9"], ["bc", "f9", "8f", "8f"]]


const polynomialMultiplication = (hex1, hex2) => {
    // console.log(hex2)
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
function hexMultiplyGF(hex1, hex2) {
    // Define Galois field
    const field = {
        multiply: (a, b) => {
            let result = 0;

            for (let i = 0; i < 8; i++) {
                if (b & 1) {
                    result ^= a;
                }

                const carry = a & 0x80;
                a <<= 1;

                if (carry) {
                    a ^= 0x1b;
                }

                b >>= 1;
            }

            return result;
        },
        add: (a, b) => a ^ b,
    };

    // Convert hex strings to arrays of bytes
    const bytes1 = hexToBytes(hex1);
    const bytes2 = hexToBytes(hex2);

    // Initialize result array with zeros
    const result = new Array(bytes1.length + bytes2.length - 1).fill(0);

    // Multiply bytes using Galois field multiplication
    for (let i = 0; i < bytes1.length; i++) {
        for (let j = 0; j < bytes2.length; j++) {
            const product = field.multiply(bytes1[i], bytes2[j]);
            const index = i + j;

            // XOR product with result at the appropriate index
            result[index] ^= product;
        }
    }

    // Convert result array to hex string
    let hexResult = bytesToHex(result);

    // If the result is longer than 2 characters, truncate it to 2 characters
    if (hexResult.length > 2) {
        hexResult = hexResult.substr(hexResult.length - 2);
    }

    return hexResult;
}

function hexToBytes(hex) {
    const bytes = [];

    for (let i = 0; i < hex.length; i += 2) {
        const byte = parseInt(hex.substr(i, 2), 16);
        bytes.push(byte);
    }

    return bytes;
}

function bytesToHex(bytes) {
    let hex = '';

    for (let i = 0; i < bytes.length; i++) {
        const byte = bytes[i];
        hex += byte.toString(16).padStart(2, '0');
    }

    return hex;
}

export const matrixMultiplication = (inputMatrix, constantMatrix) => {
    let result = Array.from({ length: 4 }, () => Array(4).fill(0))
    // console.log(inputMatrix)
    // console.log(constantMatrix)
    for (let i = 0; i < inputMatrix.length; i++) {
        for (let j = 0; j < inputMatrix.length; j++) {
            result[j][i] = "0";
            for (let k = 0; k < constantMatrix.length; k++) {
                result[j][i] = xors(result[j][i], hexaToBinary(hexMultiplyGF(constantMatrix[j][k], inputMatrix[k][i])), k);
                // console.log(result)
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

    // console.log("result>>> " + result)
    return result;
}

// console.log("Mul: " + matrixMultiplication(matrixConstructor("876e46a6f24ce78c4d904ad897ecc395", true), constantMatrix))

