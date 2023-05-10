import { roundConstant } from '../tools/sbox.js'
import { hexaToBinary,binaryToHexa, matrixConstructor } from '../tools/tools.js'
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
    let temp= keyMatrix[0][3];
    keyMatrix[0][3]=keyMatrix[1][3];
    keyMatrix[1][3]=keyMatrix[2][3];
    keyMatrix[2][3]=keyMatrix[3][3];
    keyMatrix[3][3]=temp;

    return keyMatrix;
}
const matrix = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]]
// console.log(matrix)
// console.log(shiftingColum(matrix));

const xor = (first,second) => {
    // console.log(first)
    let result ="";
    for (let x = 0; x < first.length; x++) {
        // console.log(second.charAt(x))
        if(first.charCodeAt(x)==second.charCodeAt(x))
        result+="0";
        else
        result+="1";
        
    }
    // console.log(result)
    return binaryToHexa(result);

}




export const keyExpansion = (keyText) => {
    
    hexaRoundConstantToBinary();
    
    let encriptionKeys=[];
    let keyMatrix=matrixConstructor(keyText,false);
    
    for (let x = 0; x < 10; x++) {
        let shiftedMatrix=shiftingColum(keyMatrix);
        // console.log(shiftedMatrix)
        let substitutedMatrix=byteSubstitute(shiftedMatrix);
        // console.log(substitutedMatrix)
        let lastColum=substitutedMatrix[0][3]+substitutedMatrix[1][3]+substitutedMatrix[2][3]+substitutedMatrix[3][3];
        // console.log(lastColum)
        // console.log(hexaToBinary(lastColum))
        // console.log(binaryRoundConstant[1])
        let xorRoundConstant=xor(hexaToBinary(lastColum),binaryRoundConstant[x+1]);
        // console.log(xorRoundConstant)
        let hexaKey="";
        for (let y = 0; y <4; y++) {
            let firstColum=substitutedMatrix[0][y]+substitutedMatrix[1][y]+substitutedMatrix[2][y]+substitutedMatrix[3][y];
            // console.log(firstColum)
            let xorColum=xor(hexaToBinary(xorRoundConstant) ,hexaToBinary(firstColum));
            // console.log(xorColum)
            xorRoundConstant=xorColum;
            for (let z = 0; z < 8; z++) {
                hexaKey+=xorColum[z];   
            }

        }
        console.log(x+"     "+hexaKey)        
        keyMatrix=matrixConstructor(hexaKey,true);
        
        // console.log(keyMatrix)

        encriptionKeys.push(keyMatrix);
        // console.log(encriptionKeys);
        
    }
    return encriptionKeys;
}


