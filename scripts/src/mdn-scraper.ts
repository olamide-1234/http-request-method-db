import * as puppeteer from "puppeteer";
import {HTTPRequestMethod, HTTPRequestMethodBrowserInfo, HTTPRequestMethodDb, HTTPRequestMethodSpecification} from "http-request-method-db";

export const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods');

  const requestMethodLinkElements = await page.$$('#sidebar-quicklinks .toggle > details ol > li > a[href^="/en-US/docs/Web/HTTP/Methods"]');
  const requestMethodLinks: string[] = [];
  for (const requestMethodLinkElement of requestMethodLinkElements) {
    requestMethodLinks.push(await requestMethodLinkElement.evaluate((link: HTMLLinkElement) => {
      return link.href;
    }, requestMethodLinkElement));
  }
  await requestMethodLinkElements?.forEach(h => h.dispose());

  const httpRequestMethodDb: HTTPRequestMethodDb = {};
  for (const requestMethodLink of requestMethodLinks) {
    await page.goto(requestMethodLink, {
      waitUntil: 'networkidle2',
    });
    console.log(requestMethodLink);

    const httpRequestMethod: HTTPRequestMethod = await page.evaluate((data) => {
      const removeExtraSpace = (str: string) => {
        return str.replace(/\s+/g, " ");
      }

      const name = document.querySelector('.main-page-content h1')!.textContent!.trim();

      // @ts-ignore
      const description = [...document.querySelector('.main-page-content .section-content').querySelectorAll(':scope > p')]
        .map((p: HTMLParagraphElement) => p.textContent?.trim() ?? '').join('\n');
      const note = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.note')?.textContent?.trim();

      const warning = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.warning')?.textContent?.trim();

      let requestHasBody: boolean | undefined;
      let successfulResponseHasBody: boolean | undefined;
      let safe: boolean | undefined;
      let idempotent: boolean | undefined;
      let cacheable: boolean | undefined;
      let allowedInHtmlForms: boolean | undefined;
      const tableScroll = document.querySelector('.main-page-content .section-content')?.querySelector('.table-scroll');
      if (tableScroll) {
        // @ts-ignore
        const rows: HTMLTableRowElement[] = [...tableScroll.querySelectorAll('.properties tr')];
        for (const row of rows) {
          const key = row.querySelector('th')?.textContent?.trim().toLowerCase();
          const value = row.querySelector('td')?.textContent?.trim().toLowerCase();
          switch (key) {
            case 'request has body':
              if (value != null) {
                requestHasBody = value === 'yes';
              }
              break;
            case 'successful response has body':
              if (value != null) {
                successfulResponseHasBody = value === 'yes';
              }
              break;
            case 'safe':
              if (value != null) {
                safe = value === 'yes';
              }
              break;
            case 'idempotent':
              if (value != null) {
                idempotent = value === 'yes';
              }
              break;
            case 'cacheable':
              if (value != null) {
                cacheable = value === 'yes';
              }
              break;
            case 'allowed in HTML forms':
              if (value != null) {
                allowedInHtmlForms = value === 'yes';
              }
              break;
          }
        }
      }

      const syntax = document.querySelector('section[aria-labelledby="syntax"] .section-content .code-example code')?.textContent?.trim();

      // @ts-ignore
      const examples = [...document.querySelectorAll('section[aria-labelledby^="example"] .section-content .code-example pre.http code')]
        .map((code: HTMLElement) => code.textContent?.trim() ?? '');

      const specifications: HTTPRequestMethodSpecification[] = [];
      const specificationTable = document.querySelector('.main-page-content #specifications + table');
      if (specificationTable) {
        // @ts-ignore
        const rows: HTMLTableRowElement[] = [...specificationTable.querySelectorAll('tbody tr')];
        for (const row of rows) {
          specifications.push({
            name: row.querySelector('td')?.textContent?.trim() ?? '',
            link: row.querySelector('a')?.href
          });
        }
      }

      const browserCompatibility: HTTPRequestMethodBrowserInfo[] = [];
      const browserCompatibilityRow = document.querySelector('.main-page-content .bc-table tbody tr');
      if (browserCompatibilityRow) {
        // @ts-ignore
        const tds = [...browserCompatibilityRow.querySelectorAll('td')] as HTMLTableColElement[];
        for (const td of tds) {
          let supported: boolean | undefined;
          if (td.querySelector('abbr')?.classList.contains('bc-level-yes') ||
            td.querySelector('abbr')?.classList.contains('bc-level-no')) {
            supported = td.querySelector('abbr')?.classList.contains('bc-level-yes');
          }
          browserCompatibility.push({
            name: td.querySelector('.bc-browser-name')?.textContent?.trim() ?? '',
            supported,
            version: td.querySelector('.bc-version-label')?.textContent?.trim() ?? ''
          });
        }
      }

      const httpRequestMethodInfo: HTTPRequestMethod = {
        name,
        description: description ? removeExtraSpace(description) : undefined,
        note: note ? removeExtraSpace(note) : undefined,
        syntax,
        link: data.requestMethodLink,
        requestHasBody,
        successfulResponseHasBody,
        safe,
        idempotent,
        cacheable,
        allowedInHtmlForms,
        warning: warning ? removeExtraSpace(warning) : undefined,
        examples,
        specifications,
        browserCompatibility
      };
      return httpRequestMethodInfo;
    }, {
      requestMethodLink
    });

    httpRequestMethodDb[httpRequestMethod.name.toLowerCase()] = httpRequestMethod;
  }

  await browser.close();

  return httpRequestMethodDb;
}
