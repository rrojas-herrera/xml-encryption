import { encrypt, decrypt } from "./utils/utils.js";
import fs from "fs";
import util from "util";

import { paths } from "./paths.js";
global.path = paths;

const readFile = util.promisify(fs.readFile);

console.clear();

readXml(`${paths.xml}/za6.xml`).then((za6) => {
  const encryptOpts = {
    rsa_pub: fs.readFileSync(`${global.path.pem}/test-auth0_rsa.pub`),
    pem: fs.readFileSync(`${global.path.pem}/sit-sanna.public.pem`),
    encryptionAlgorithm: "http://www.w3.org/2009/xmlenc11#aes128-gcm",
    keyEncryptionAlgorithm: "http://www.w3.org/2001/04/xmlenc#rsa-1_5",
    disallowEncryptionWithInsecureAlgorithm: false,
    warnInsecureAlgorithm: false
  };

  encrypt(za6, encryptOpts).then((value) => {

    console.log(`\n${value}`);
    readXml(`${global.path.files}/encrypt-za6.xml`).then((data) => {
      
      const decryptOpts = {
        key: fs.readFileSync(`${global.path.pem}/test-auth0.key`),
        disallowDecryptionWithInsecureAlgorithm: false,
        warnInsecureAlgorithm: false,
      };

      decrypt(value, decryptOpts).then((data)=>{
        console.log(`\n${data}`);
      });
    });
  });
});

function readXml(file) {
  return readFile(file);
}
