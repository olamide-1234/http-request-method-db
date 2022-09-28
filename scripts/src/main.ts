import * as fs from "fs";
import * as path from "path";
import * as MdnScraper from "./mdn-scraper";
import {HTTPRequestMethodDb} from "http-request-method-db";

(async () => {
  let httpRequestMethodDb = await MdnScraper.run();

  // load custom request methods
  const customRequestMethods = require('./custom-request-methods.json') as HTTPRequestMethodDb;

  httpRequestMethodDb = {
    ...httpRequestMethodDb,
    ...customRequestMethods
  };

  const dbJsonPath = path.join(__dirname, '..', '..', 'src', 'db.json');
  console.log(`Save db.json to ${dbJsonPath}`);
  fs.writeFileSync(dbJsonPath, JSON.stringify(httpRequestMethodDb, null, '\t'));
})();
