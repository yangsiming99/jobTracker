import puppeteer from 'puppeteer';

const getIndeedInfo = async(link: string) => {
  // const date = new Date().toJSON();
  // console.log(link)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link, {waitUntil: 'networkidle2'});

  await page.waitForSelector('.jobsearch-JobInfoHeader-title')
  const position = await page.evaluate(() => {
    return document.querySelector('.jobsearch-JobInfoHeader-title')?.innerHTML;
  })

  const company = await page.evaluate(() => {
    let elements = Array.from(document.querySelectorAll('.icl-u-lg-mr--sm'), element => element.innerHTML)
    return elements[1].split('>')[1].split('<')[0]
  })

  // await page.screenshot({path: 'example.png'})
  await browser.close();
  return {
    position: position, 
    company: company,
    site: "Indeed.com",
    link: link,
    dateApplied: new Date().toJSON()
  }
}

export {
  getIndeedInfo
}