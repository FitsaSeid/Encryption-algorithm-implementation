import { byteSubstitute } from "./byte-substitution/byteSubstitution.js";
import { textToHexa, hexaToBinary, matrixConstructor, slicer } from './tools/tools.js';
import { shiftingRow } from "./shifting-rows/shiftingRows.js";
import { matrixMultiplication } from "./mixing-column/mixingColumn.js";
const plainText = "codingisawesomex";

let block = matrixConstructor(plainText, false);
let subPlain = byteSubstitute(block);
let shiftedMatrix = shiftingRow(subPlain)
console.log(shiftedMatrix)
console.log(matrixMultiplication(shiftedMatrix))