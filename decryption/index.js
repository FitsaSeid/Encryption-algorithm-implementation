import { inverseConstantMatrix } from "../tools/sbox.js"
import { byteSubstitute } from "./inverse-byte-substitute/inverseByteSubstitution.js";
import { shiftingRow } from "./inverse-shifting-column/inverseShiftingRow.js";
import { mixingColumn } from "./inverse-mixing-column/inverseMixingColumn.js";
import { matrixConstructor } from "../tools/tools.js";

// const arr = [["47", "40", "a3", "4c"], ["37", "d4", "70", "9f"], ["94", "e4", "3a", "42"], ["ed", "a5", "a6", "bc"]];
// d3be48cbfba3df4d0fd8e9b3919b2221
let arr = matrixConstructor("d3be48cbfba3df4d0fd8e9b3919b2221", true);
const byteSub = byteSubstitute(arr);
const shiftedMat = shiftingRow(byteSub);
const mixColumn = mixingColumn(shiftedMat, inverseConstantMatrix);

