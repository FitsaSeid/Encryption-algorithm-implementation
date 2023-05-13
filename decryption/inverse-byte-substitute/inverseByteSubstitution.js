import { inverseSbox } from '../../tools/sbox.js'

export const byteSubstitute = (block) => {
    for (let x = 0; x < block.length; x++) {
        for (let y = 0; y < block.length; y++) {
            block[y][x] = inverseSbox[block[y][x]];
        }
    }
    return block;
}
