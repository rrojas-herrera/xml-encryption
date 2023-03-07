'use strict'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths={
  encryption: `${__dirname}/encryption`,
  data: `${__dirname}/encryption/data`,
  pem: `${__dirname}/pem`,
  pub: `${__dirname}/pub`,
  public: `${__dirname}/public`,
  xml: `${__dirname}/xml`,
}
export {paths}