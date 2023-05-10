import { matrixConstructor } from "../tools/tools.js"
import { matrixMultiplierConstant } from "../tools/sbox.js"

export const mixingColumn = (shiftedMatrix) => {
    const constantMatrix = matrixConstructor(matrixMultiplierConstant, true);

}
