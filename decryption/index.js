import { inverseConstantMatrix } from "../tools/sbox.js"
import { byteSubstitute } from "./inverse-byte-substitute/inverseByteSubstitution.js";
import { shiftingRow } from "./inverse-shifting-column/inverseShiftingRow.js";
import { mixingColumn } from "./inverse-mixing-column/inverseMixingColumn.js";
import { binaryToHexa, binaryToHexa2, hexToString, hexaToBinary, matrixConstructor, textToHexa, xor } from "../tools/tools.js";
import { keyExpansion } from "../key expansion/keyExpansion.js";

let btn = document.getElementById("decBtn");

btn.addEventListener('click', (e) => {
    e.preventDefault();

    let cipherText = document.getElementById("ciphertext").value;
    let encryptionKey = document.getElementById("decKey").value;

    let encryptionKeys = keyExpansion(textToHexa(encryptionKey));
    let round0 = xor(hexaToBinary(cipherText), hexaToBinary(encryptionKeys[9]));
    console.log(cipherText)

    cipherText = ''
    let i = 0
    while (i <= 96) {
        cipherText += binaryToHexa2(round0.slice(i, i + 32));
        i += 32;
    }
    let x = 9;
    const decrypt = (cipherText, encKey) => {
        cipherText = matrixConstructor(cipherText, true);
        console.log(cipherText)
        let shiftingRows = shiftingRow(cipherText);
        let byteSub = byteSubstitute(shiftingRows);
        let text = ''
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                text += byteSub[y][x];
            }
        }
        text = xor(hexaToBinary(encryptionKeys[x - 1]), hexaToBinary(text));
        let i = 0
        let decryptedText = '';
        while (i <= 96) {
            decryptedText += binaryToHexa2(text.slice(i, i + 32));
            i += 32;
        }
        let mixColumn = mixingColumn(matrixConstructor(decryptedText, true), inverseConstantMatrix);
        decryptedText = '';
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                decryptedText += mixColumn[y][x];
            }
        }
        console.log(decryptedText)
        if (x === 1)
            return lastRound(decryptedText, encKey);
        else {
            x--;
            return decrypt(decryptedText, encKey);
        }

    }

    const lastRound = (cipherText, encKey) => {
        let shiftingRows = shiftingRow(matrixConstructor(cipherText, true));
        let byteSub = byteSubstitute(shiftingRows);
        let plainText = '';
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                plainText += byteSub[y][x];
            }
        }
        // console.log(plainText)
        // console.log(encKey)
        plainText = xor(hexaToBinary(plainText), hexaToBinary(textToHexa(encKey)));
        let i = 0
        let output = '';
        while (i <= 96) {
            output += binaryToHexa2(plainText.slice(i, i + 32));
            i += 32;
        }
        console.log(hexToString(output))
        return output;
    }

    decrypt(cipherText, encryptionKey)
})
