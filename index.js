import { byteSubstitute } from "./byte-substitution/byteSubstitution.js";
import { textToHexa, hexaToBinary, matrixConstructor, slicer } from './tools/tools.js';
import { shiftingRow } from "./shifting-rows/shiftingRows.js";
import { mixingColumn } from "./mixing-column/mixingColumn.js";
const plainText = "codingisawesomex";

let block = matrixConstructor(slicer(textToHexa(plainText), 2));
// let subPlain = byteSubstitute(block);
// let shiftedMatrix = shiftingRow(subPlain)
// mixingColumn(shiftedMatrix)