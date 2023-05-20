import { byteSubstitute } from "./byte-substitution/byteSubstitution.js";
import { textToHexa, hexaToBinary, matrixConstructor, slicer, xor, binaryToHexa, binaryToHexa2 } from './tools/tools.js';
import { shiftingRow } from "./shifting-rows/shiftingRows.js";
import { matrixMultiplication } from "./mixing-column/mixingColumn.js";
import { sbox, constantMatrix, inverseConstantMatrix } from "./tools/sbox.js";
import { keyExpansion } from "./key expansion/keyExpansion.js";

let btn = document.getElementById("encBtn");

btn.addEventListener('click', (e) => {
    e.preventDefault();


    const plainText = document.getElementById("plaintext").value;
    console.log(textToHexa(plainText))
    let KEY = document.getElementById("encKey").value;
    console.log(KEY)
    console.log(plainText)
    let encryptionKey = keyExpansion(textToHexa(KEY));
    let round0Key = textToHexa(KEY);

    let hexaPlainText = textToHexa(plainText);
    let firstRound = xor(hexaToBinary(hexaPlainText), hexaToBinary(round0Key));
    let i = 0;
    hexaPlainText = '';
    while (i <= 96) {
        hexaPlainText += binaryToHexa2(firstRound.slice(i, i + 32));
        i += 32;
    }
    console.log(hexaPlainText)

    let x = 0;
    const encrypt = (hexaPlainText) => {
        console.log(hexaPlainText)
        let block = matrixConstructor(hexaPlainText, true);
        let subPlain = byteSubstitute(block);
        console.log(subPlain)
        let shiftedMatrix = shiftingRow(subPlain);
        let text = '';
        if (x === 9) {
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    text += shiftedMatrix[y][x];
                }
            }
        } else {
            let mixingColum = matrixMultiplication(shiftedMatrix, constantMatrix);
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    text += mixingColum[y][x];
                }
            }
        }

        text = xor(hexaToBinary(encryptionKey[x]), hexaToBinary(text));
        let encryptedText = ''
        let i = 0;
        while (i <= 96) {
            encryptedText += binaryToHexa2(text.slice(i, i + 32))
            i += 32
        }
        console.log("Enc : " + encryptedText)
        if (x === 9)
            return encryptedText;
        else {
            x++;
            return encrypt(encryptedText);
        }
    }
    console.log(encrypt(hexaPlainText));
})
// encrypt(hexaPlainText)