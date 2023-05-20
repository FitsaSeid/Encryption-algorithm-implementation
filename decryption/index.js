import { inverseConstantMatrix } from "../tools/sbox.js"
import { byteSubstitute } from "./inverse-byte-substitute/inverseByteSubstitution.js";
import { shiftingRow } from "./inverse-shifting-column/inverseShiftingRow.js";
import { mixingColumn } from "./inverse-mixing-column/inverseMixingColumn.js";
import { binaryToHexa, binaryToHexa2, hexToString, hexaToBinary, matrixConstructor, slicer, textToHexa, xor } from "../tools/tools.js";
import { keyExpansion } from "../key expansion/keyExpansion.js";

let btn = document.getElementById("decBtn");

btn.addEventListener('click', (e) => {
    e.preventDefault();

    let cipherTxt = document.getElementById("ciphertext").value;
    let decryptionKey = document.getElementById("decKey").value;
    let plainText = '';

    if (decryptionKey.length < 16) {
        document.getElementsByClassName("error")[0].innerHTML = "Decryption key must be 128 bit or 16 character. Eg: coding is awesom";
    } else {
        document.getElementsByClassName("error")[0].innerHTML = "";
        let potentialCipher = slicer(textToHexa(cipherTxt), 32);
        let encryptionKeys = keyExpansion(textToHexa(decryptionKey));


        potentialCipher.map(cipherText => {
            let round0 = xor(hexaToBinary(cipherText), hexaToBinary(encryptionKeys[9]));
            cipherText = ''
            let i = 0;
            while (i <= 96) {
                cipherText += binaryToHexa2(round0.slice(i, i + 32));
                i += 32;
            }
            let x = 9;
            const decrypt = (cipherText, encKey) => {
                cipherText = matrixConstructor(cipherText, true);
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
                // console.log(decryptedText)
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
                plainText = xor(hexaToBinary(plainText), hexaToBinary(textToHexa(encKey)));
                let i = 0
                let output = '';
                while (i <= 96) {
                    output += binaryToHexa2(plainText.slice(i, i + 32));
                    i += 32;
                }
                return output;
            }

            plainText += hexToString(decrypt(cipherText, decryptionKey))
        })
    }
    // console.log(plainText)
    let op = document.getElementsByClassName("output")[0];
    let title = document.getElementsByClassName("title")[0];
    title.innerHTML = "Plaintext"
    op.innerHTML = plainText
})
