import { byteSubstitute } from "./byte-substitution/byteSubstitution.js";
import { textToHexa, hexaToBinary, matrixConstructor, slicer } from './tools/tools.js';
import { shiftingRow } from "./shifting-rows/shiftingRows.js";
import { mixingColumn } from "./mixing-column/mixingColumn.js";
import {keyExpansion} from "./key expansion/keyExpansion.js"
const plainText = "codingisawesomex";

let block = matrixConstructor(plainText, false);
let subPlain = byteSubstitute(block);
let shiftedMatrix = shiftingRow(subPlain)
keyExpansion("hellobahirdarcty");
mixingColumn(shiftedMatrix)