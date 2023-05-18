import { roundConstant, sbox } from '../tools/sbox.js'
import { hexaToBinary, binaryToHexa, matrixConstructor } from '../tools/tools.js'
import { byteSubstitute } from '../byte-substitution/byteSubstitution.js'

let binaryRoundConstant = [];

const hexaRoundConstantToBinary = () => {
    for (let x = 1; x <= 10; x++) {
        let hexa = "";

        roundConstant[x].map(i => {
            hexa += hexaToBinary(i);
        })

        binaryRoundConstant.push(
            hexa
        )
    }
    return binaryRoundConstant;
}

// console.log(hexaRoundConstantToBinary())

const shiftingColum = (keyMatrix) => {
    let temp = keyMatrix[0][3];
    keyMatrix[0][3] = keyMatrix[1][3];
    keyMatrix[1][3] = keyMatrix[2][3];
    keyMatrix[2][3] = keyMatrix[3][3];
    keyMatrix[3][3] = temp;

    return keyMatrix;
}
const matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
// console.log(matrix)
// console.log(shiftingColum(matrix));
const arr = [["47", "40", "a3", "4c"], ["37", "d4", "70", "9f"], ["94", "e4", "3a", "42"], ["ed", "a5", "a6", "bc"]];


const byteSub = (block) => {
    for (let x = 0; x < block.length; x++) {
        block[x][3] = sbox[block[x][3]];
    }
    return block;
}


let x = 0;

export const keyExpansion = (keyText) => {
    hexaRoundConstantToBinary();
    let encriptionKeys = [];
    let keyMatrix = matrixConstructor(keyText, true);
    let lastColum = keyMatrix[0][3] + keyMatrix[1][3] + keyMatrix[2][3] + keyMatrix[3][3];
    let shiftedMatrix = shiftingColum(keyMatrix);
    byteSub(shiftedMatrix);

    let text = "";
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            text += shiftedMatrix[y][x];
        }
    }
    // console.log(text)
    let xorValue = xor(hexaToBinary(text.slice(24, 32)), binaryRoundConstant[x]);
    let words = xor(hexaToBinary(text.slice(0, 8)), hexaToBinary(xorValue));
    words += xor(hexaToBinary(text.slice(8, 16)), hexaToBinary(words));
    words += xor(hexaToBinary(text.slice(16, 24)), hexaToBinary(words.slice(8, 16)));
    words += xor(hexaToBinary(lastColum), hexaToBinary(words.slice(16, 24)));

    console.log(words)
    encriptionKeys.push(matrixConstructor(words, true));

    if (x >= 9)
        return encriptionKeys;
    else {
        x++;
        keyExpansion(words)
    }
}


const xor = (first, second) => {
    // console.log(first)
    // console.log(second)
    let result = "";
    for (let x = 0; x < first.length; x++) {
        if (first.charAt(x) === second.charAt(x))
            result += "0";
        else
            result += "1";
    }
    return binaryToHexa(result);

}
