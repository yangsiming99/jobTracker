import puppeteer from 'puppeteer';

const getGLinfo = async(link: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link, {waitUntil: 'networkidle2'});

  await page.waitForSelector('.e11nt52q6');
  const position = await page.evaluate(() => {
    return document.querySelector('.e11nt52q6')?.innerHTML;
  })

  await page.waitForSelector('.e11nt52q1');
  const company = await page.evaluate(() => {
    return document.querySelector('.e11nt52q1')?.innerHTML;
  })

  // await page.screenshot({path: 'example.png'})

  return {
    position: position, 
    company: company?.split('<span')[0],
    site: "Glassdoor",
    link: link,
    dateApplied: new Date().toJSON()
  }
}

export {
  getGLinfo
}