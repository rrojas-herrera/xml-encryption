'use strict'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths={
  utils: `${__dirname}/utils`,
  files: `${__dirname}/generated-files`,
  pem: `${__dirname}/pem`,
  pub: `${__dirname}/pub`,
  xml: `${__dirname}/xml`,
}
export {paths}