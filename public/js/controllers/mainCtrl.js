app.controller("mainCtrl", function($scope, $http, $location, $routeParams) {


    var serverAddr = "http://localhost:2709/api";
    console.log("Server: "+serverAddr);

    var symmetricKeyLength = 128;

    var mensaje = "Hola";

    $scope.generateRSA = function() {

        rsa.generateKeys(1024);
    };

    $scope.startnr = function() {
        console.log("Comenzando no repudio");
        console.log("symetricKeyLength: "+symmetricKeyLength);

        //var rand = bigInt.randBetween(bigInt(2).pow(symmetricKeyLength-1), bigInt(2).pow(symmetricKeyLength));
        //console.log("Rand length: "+rand.toString(16).length);

        //var randB = hexToBytes(rand.toString(16));

        //console.log("RandB: "+bigInt(bytesToHex(randB),16).toString());

        var key = CryptoJS.lib.WordArray.random(16);
        var iv = CryptoJS.lib.WordArray.random(16);
        //var passwordWordArray = hexToWordArray(rand.toString(16));
        //console.log("Password word array: "+ passwordWordArray);
        var encrypted = CryptoJS.AES.encrypt(mensaje, key, { iv: iv});
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv});
        console.log("Desencriptado: "+decrypted.toString(CryptoJS.enc.Utf8));
        var K = {
            key: CryptoJS.enc.Base64.stringify(key),
            iv: CryptoJS.enc.Base64.stringify(iv)
        };
        console.log("Key: "+ K.key);

        var Po = CryptoJS.MD5("A+B+"+encrypted);




        var msg1 = {
            src: "A",
            dst: "B",
            timestamp: "",
            cryptogram: "",
            proofOfOrigin: Po
        };


        console.log("[SEND] A -> B : msg1");
        console.log(JSON.stringify(msg1));
        $http.post(serverAddr+'/nr/1', msg1)
            .then(function success(data) {
                console.log("[RECV] B -> A : msg2")
                console.log(JSON.stringify(data.data));

                var msg3 = {
                    src: "A",
                    dst: "B",
                    timestamp: "",
                    cryptogram: "",
                    proofOfOrigin: ""
                };

                console.log("[SEND] A -> B : msg3");
                console.log(JSON.stringify(msg3));
                $http.post(serverAddr+'/nr/2', msg3)
                    .then(function success(data) {
                        console.log("[RECV] B -> A : msg4")
                        console.log(JSON.stringify(data.data));

                    }, function error() {
                        console.log("Error");
                    });

            }, function error() {
                console.log("Error");
            });
    };



    var log = function(content) {
      $scope.logs.append()
    };

});
