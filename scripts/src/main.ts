import * as fs from "fs";
import * as path from "path";
import * as MdnScraper from "./mdn-scraper";
import * as IanaScraper from "./iana-scraper";
import {HTTPRequestMethodDb} from "http-request-method-db";

(async () => {
  const httpRequestMethodDb = mergeDatabases([
    await MdnScraper.run(),
    await IanaScraper.run(),
    // load custom request methods
    require('./custom-request-methods.json') as HTTPRequestMethodDb
  ]);
  const dbJsonPath = path.join(__dirname, '..', '..', 'src', 'db.json');
  console.log(`Save db.json to ${dbJsonPath}`);
  fs.writeFileSync(dbJsonPath, JSON.stringify(httpRequestMethodDb, null, '\t'));
})();

function mergeDatabases(databases: HTTPRequestMethodDb[]): HTTPRequestMethodDb {
  databases = JSON.parse(JSON.stringify(databases));
  const mergedDb: HTTPRequestMethodDb = databases[0];
  for (const target of databases.slice(1)) {
    for (const key of Object.keys(target)) {
      if (mergedDb[key] == null) {
        mergedDb[key] = target[key];
      } else {
        for (const property of Object.keys(target[key])) {
          if (mergedDb[key][property] == null) {
            mergedDb[key][property] = target[key][property];
          } else {
            switch (property) {
              case 'examples':
                mergedDb[key][property] = [...new Set([...mergedDb[key][property], ...target[key][property]])];
                break;
              case 'specifications':
                for (const targetSpec of target[key][property]) {
                  if (targetSpec.link != null && !mergedDb[key][property].find(spec => spec.link === targetSpec.link)) {
                    mergedDb[key][property].push(targetSpec);
                  }
                }
                break;
              case 'browserCompatibility':
                for (const targetBrowserInfo of target[key][property]) {
                  if (!mergedDb[key][property].find(browserInfo => browserInfo.name === targetBrowserInfo.name)) {
                    mergedDb[key][property].push(targetBrowserInfo);
                  }
                }
                break;
            }
          }
        }
      }
    }
  }
  return mergedDb;
}
