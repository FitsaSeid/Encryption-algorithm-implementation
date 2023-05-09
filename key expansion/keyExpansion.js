import { roundConstant } from '../tools/sbox.js'
import { hexaToBinary, textToHexa } from '../tools/tools.js'

let binaryRoundConstant = [];

const hexaRoundConstantToBinary = () => {
    for (let x = 1; x <= 10; x++) {
        let hexa = "";

        roundConstant[x].map(i => {
            hexa += hexaToBinary(i);
        })

        binaryRoundConstant.push({
            round: x,
            binary: hexa
        })
    }
    return binaryRoundConstant;
}

const xor = (shiftedMatrix) => {

}
console.log(hexaRoundConstantToBinary())