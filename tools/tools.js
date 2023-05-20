const textToHexa = (text) => {
    let arr1 = [];
    for (let x = 0; x < text.length; x++) {
        let hex = Number(text.charCodeAt(x)).toString(16);
        hex.length % 2 ? hex = '0'+hex : hex;
        arr1.push(hex);
    }
    return arr1.join('');
}

const hexaToBinary = (hex) => {
    let binString = "";
    for (let i = 0; i < hex.length; i++) {
        let bin = parseInt(hex[i], 16).toString(2);
        binString += "0000".substr(bin.length) + bin;
    }
    return binString;
}
const binaryToHexa = (binary) => {
    let hexa = ""
    hexa = parseInt(binary, 2).toString(16).toLowerCase();
    // while (hexa.length < 8) {
    //     hexa = "0" + hexa;
    // }
    return hexa.length % 2 ? '0' + hexa : hexa;
}

const binaryToHexa2 = (binary) => {
    let hexa = ""
    hexa = parseInt(binary, 2).toString(16).toLowerCase();
    while (hexa.length < 8) {
        hexa = "0" + hexa;
    }
    return hexa.length % 2 ? '0' + hexa : hexa;
}

const slicer = (text, n) => {
    let length = text.length;
    let flag = 0;
    let slicedText = [];
    while (flag < length) {
        let sliced = text.slice(flag, flag + n);
        slicedText.push(sliced);
        flag += n;
    }
    return slicedText;
}

const matrixConstructor = (txt, isHex) => {
    let byte, hex;
    if (!isHex) {
        hex = textToHexa(txt);
        byte = slicer(hex, 2);
    } else {
        byte = slicer(txt, 2);
    }

    let matrix = Array.from({ length: 4 }, () => Array(4).fill(0))
    let slicedIndex = 0;
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix.length; y++) {
            matrix[y][x] = byte[slicedIndex];
            slicedIndex++;
        }
    }
    return matrix;
}

const hexToString = (hex) => {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
        string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}

const xor = (binaryOne, binaryTwo) => {
    let result = "";
    if (binaryOne === "0") {
        return binaryTwo
    }
    else {
        for (let i = 0; i < binaryTwo.length; i++) {
            if (binaryOne.charAt(i) === binaryTwo.charAt(i))
                result += "0"
            else
                result += "1"
        }
        return result
    }
}

const xors = (first, second, flag) => {
    if (flag === 0)
        return second
    else {
        let result = "";
        for (let x = 0; x < first.length; x++) {
            if (first.charAt(x) === second.charAt(x))
                result += "0";
            else
                result += "1";
        }
        return result;
    }
}

export { textToHexa, hexaToBinary, matrixConstructor, slicer, xor, binaryToHexa, binaryToHexa2, xors, hexToString }
