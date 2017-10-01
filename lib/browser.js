const puppeteer = require('puppeteer');
const qs = require('querystring')

const launchBrowser = async () => {
  // TODO: this is unsafe, wait for issue to be closed:
  // https://github.com/GoogleChrome/puppeteer/issues/379

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  return (carbonInstance) => loadImageInBrowser(browser, carbonInstance)
}

const loadImageInBrowser = (browser, carbonInstance) => async (code, options) => {
  const page = await browser.newPage();
  const stringifiedOptions = qs.stringify(options)
  const queryString = stringifiedOptions ? `?${stringifiedOptions}` : ''
  const hasGist = Boolean(options.gist)

  await page.goto(`${carbonInstance}${queryString}`);

  const dataUri = await page.evaluate(({ hasGist, codeString }) => {
    if (!hasGist) {
      window.SET_CODE(codeString)
    }

    return window.GET_IMAGE()
  }, { hasGist, codeString: code })

  await page.close()

  return dataUri
}

module.exports = launchBrowser
