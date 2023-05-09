import { byteSubstitute } from "./byte-substitution/byteSubstitution";
import { textToHexa, hexaToBinary, matrixConstructor, slicer } from '../tools/tools.js';

const plainText = "codingisawesomex";
let block = matrixConstructor(slicer(textToHexa(plainText), 2));

byteSubstitute(block)