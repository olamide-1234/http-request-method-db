import * as puppeteer from "puppeteer";
import {HTTPRequestMethod, HTTPRequestMethodDb, HTTPRequestMethodSpecification} from "http-request-method-db";

export const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', consoleObj => {
    if (consoleObj.type() === 'log') {
      console.log(consoleObj.text());
    }
  });
  const link = 'https://www.iana.org/assignments/http-methods/http-methods.xhtml';
  await page.goto(link);

  const httpRequestMethodDb: HTTPRequestMethodDb = await page.evaluate((data) => {
    const httpRequestMethodDb: HTTPRequestMethodDb = {};

    // @ts-ignore
    const rows = [...document.querySelectorAll('#table-methods tbody tr')];
    for (const row of rows) {
      const name = row.querySelectorAll('td')[0].textContent.trim();
      console.log(data.link, name);

      const description = `${name}`;
      const syntax = `${name}`;

      let safe = row.querySelectorAll('td')[1].textContent.trim().toLowerCase() === 'yes';
      let idempotent = row.querySelectorAll('td')[2].textContent.trim().toLowerCase() === 'yes';

      const specifications: HTTPRequestMethodSpecification[] = [];
      // @ts-ignore
      const anchors: HTMLAnchorElement[] = [...row.querySelectorAll('td')[3].querySelectorAll('a')];
      for (const anchor of anchors) {
        specifications.push({
          name: anchor.textContent?.trim() ?? '',
          link: anchor.href
        });
      }

      const httpRequestMethodInfo: HTTPRequestMethod = {
        name,
        description,
        syntax,
        link: data.link,
        safe,
        idempotent,
        examples: [],
        specifications,
        browserCompatibility: []
      };

      httpRequestMethodDb[httpRequestMethodInfo.name.toLowerCase()] = httpRequestMethodInfo;
    }

    return httpRequestMethodDb;
  }, {
    link
  });

  await browser.close();

  return httpRequestMethodDb;
}
