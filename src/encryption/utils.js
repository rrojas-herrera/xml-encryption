import fs from "fs";
import path from "path";
import xmlenc from "xml-encryption";
import { json2xml, xml2json } from "xml-js";

const characters = [
  {
    "<xenc:": "<",
  },
  {
    "</xenc:": "</",
  },
  {
    ":xenc": "",
  },
  {
    "<e:": "<",
  },
  {
    "</e:": "</",
  },
];

const tagsToDelete = {
  DigestMethod: true,
  X509Data: true,
};

const encrypt = function (data, options) {
  return new Promise(function (resolve, reject) {
    xmlenc.encrypt(data, options, function (err, result) {
      if (err) {
        throw new Error(`error encrypted data: ${err}`);
      }

      const formatXml = xml2json(
        `<ZONA_A6>${formatTags(result, characters)}</ZONA_A6>`,
        {
          compact: true,
          space: 4,
        }
      );

      const za6 = json2xml(objectParser(JSON.parse(formatXml)), {
        compact: true,
        ignoreComment: true,
        spaces: 4,
      });
      //save file
      fs.writeFileSync(`${global.path.data}/za6.xml`, za6);
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

      //save file
      fs.writeFileSync(`${global.path.data}/decrtpy.xml`, result);
      console.log(`-->> decrypt success!!!`);
      resolve(result);
    });
  });
};

const saveFile = function (name, data) {
  fs.writeFileSync(name, data);
};

const formatTags = function (text, characters) {
  for (const [i, each] of characters.entries()) {
    const previousChar = Object.keys(each);
    const newChar = Object.values(each);

    text = text.replaceAll(previousChar, newChar);
  }

  return text;
};

const objectParser = (obj) => {
  for (const key in obj) {
    if (tagsToDelete.hasOwnProperty(key) && tagsToDelete[key]) {
      delete obj[key];
    }

    if (isObject(obj[key])) {
      objectParser(obj[key]);
    }
  }
  return obj;
};

const isObject = (val) => {
  if (val === null) {
    return false;
  }

  return typeof val === "object";
};

export { encrypt, decrypt };
