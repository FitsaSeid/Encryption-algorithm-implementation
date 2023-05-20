import { byteSubstitute } from "./byte-substitution/byteSubstitution.js";
import { textToHexa, hexaToBinary, matrixConstructor, slicer, xor, binaryToHexa, binaryToHexa2, hexToString } from './tools/tools.js';
import { shiftingRow } from "./shifting-rows/shiftingRows.js";
import { matrixMultiplication } from "./mixing-column/mixingColumn.js";
import { sbox, constantMatrix, inverseConstantMatrix } from "./tools/sbox.js";
import { keyExpansion } from "./key expansion/keyExpansion.js";

const btn = document.getElementById("encBtn");

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const plainTxt = document.getElementById("plaintext").value;
    let KEY = document.getElementById("encKey").value;
    let cipherText = ''

    if (KEY.length < 16) {
        document.getElementsByClassName("error")[0].innerHTML = "Encryption key must be 128 bit or 16 character. Eg: coding is awesom";
    } else {
        document.getElementsByClassName("error")[0].innerHTML = "";

        let encryptionKey = keyExpansion(textToHexa(KEY));

        let text = slicer(plainTxt, 16);
        let filler = 16 - text[text.length - 1].length;
        if (filler > 0) {
            for (let x = 0; x < filler; x++) {
                text[text.length - 1] += ' ';
            }
        }
        console.log(text)
        text.map(plainText => {

            let round0Key = textToHexa(KEY);
            let hexaPlainText = textToHexa(plainText);
            let firstRound = xor(hexaToBinary(hexaPlainText), hexaToBinary(round0Key));
            let i = 0;
            hexaPlainText = '';
            while (i <= 96) {
                hexaPlainText += binaryToHexa2(firstRound.slice(i, i + 32));
                i += 32;
            }
            // console.log(hexaPlainText)

            let x = 0;
            const encrypt = (hexaPlainText) => {
                let block = matrixConstructor(hexaPlainText, true);
                let subPlain = byteSubstitute(block);
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
                // console.log("Enc : " + encryptedText)
                if (x === 9)
                    return encryptedText;
                else {
                    x++;
                    return encrypt(encryptedText);
                }
            }
            cipherText += encrypt(hexaPlainText)

        })
    }
    // console.log(cipherText)
    let title = document.getElementsByClassName("title")[0];
    title.innerHTML = "Cipher Text"
    let op = document.getElementsByClassName("output")[0];
    op.innerHTML = hexToString(cipherText)
})