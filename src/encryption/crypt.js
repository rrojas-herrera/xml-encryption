import fs from "fs";
import path from "path";
import xmlenc from "xml-encryption";

const encrypt = function (data, options) {
  return new Promise(function (resolve, reject) {
    xmlenc.encrypt(data, options, function (err, result) {
      if (err) {
        throw new Error(`error encrypted data: ${err}`);
      }

      fs.writeFileSync(`${global.path.data}/signed.xml`, result);
      console.log(`-->> encrypt success!!!`);
      resolve(result);
    });
  });
};

const decrypt = function (data, options) {
  return new Promise(function (resolve, reject) {
    xmlenc.decrypt(data, options, function (err, result) {
      if (err) {
        throw new Error(`error encrypted data: ${err}`);
      }

      console.log(`-->> decrypt success!!!`);
      fs.writeFileSync(`${global.path.data}/decrtpy.xml`, result);
      resolve(result);
    });
  });
};

export { encrypt, decrypt };
