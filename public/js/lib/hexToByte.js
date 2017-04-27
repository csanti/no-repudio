// Convert a hex string to a byte array
var hexToBytes = function(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
};

// Convert a hex string to a byte array
var hexToWordArray = function(hex) {
    for (var words = [], c = 0; c < hex.length; c += 4)
        words.push(parseInt(hex.substr(c, 4), 16));
    return words;
};

// Convert a byte array to a hex string
var bytesToHex = function (bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
};
