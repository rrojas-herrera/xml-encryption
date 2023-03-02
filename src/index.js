import { encrypt, decrypt } from "./encryption/crypt.js";
import fs from "fs";
import parser from "xml2json";
import util from "util";

import { paths } from "./paths.js";
global.path = paths;

const readFile = util.promisify(fs.readFile);

console.clear();
console.log("xml-encryption");

readXml(`${paths.xml}/za6.xml`).then((za6) => {
  const encryptOpts = {
    rsa_pub: fs.readFileSync(`${global.path.public}/test-auth0_rsa.pub`),
    pem: fs.readFileSync(`${global.path.public}/test-auth0.pem`),

    encryptionAlgorithm: "http://www.w3.org/2009/xmlenc11#aes128-gcm",
    keyEncryptionAlgorithm: "http://www.w3.org/2001/04/xmlenc#rsa-1_5",
    disallowEncryptionWithInsecureAlgorithm: false,
    warnInsecureAlgorithm: false,

    // encryptionAlgorithm: "http://www.w3.org/2001/04/xmlenc#aes256-cbc",
    // keyEncryptionAlgorithm: "http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p",
    // disallowEncryptionWithInsecureAlgorithm: true,
    // warnInsecureAlgorithm: true,
  };

  encrypt(za6, encryptOpts).then((value) => {
    console.log(value);

    readFile(`${global.path.data}/signed.xml`).then((signed) => {
      
      const decryptOpts = {
        key: fs.readFileSync(`${global.path.public}/test-auth0.key`),
        disallowDecryptionWithInsecureAlgorithm: false,
        warnInsecureAlgorithm: false,
      };

      decrypt(value, decryptOpts).then((decrypt)=>{
        console.log(`decrypt result: \n\n${decrypt}`);
      });
    });
  });
});

function readXml(file) {
  return readFile(file);
}
