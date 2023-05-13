import { inverseConstantMatrix } from "../tools/sbox.js"
import { byteSubstitute } from "./inverse-byte-substitute/inverseByteSubstitution.js";
import { shiftingRow } from "./inverse-shifting-column/inverseShiftingRow.js";
import { mixingColumn } from "./inverse-mixing-column/inverseMixingColumn.js";

const arr = [["47", "40", "a3", "4c"], ["37", "d4", "70", "9f"], ["94", "e4", "3a", "42"], ["ed", "a5", "a6", "bc"]];

const byteSub = byteSubstitute(arr);
console.log(byteSub)
const shiftedMat = shiftingRow(byteSub);
// console.log(shiftedMat)
// const mixColumn = mixingColumn(arr, inverseConstantMatrix);

// console.log(mixColumn)

