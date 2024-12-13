const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // 디버깅을 위해 브라우저 띄움
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1366,
    height: 768,
  });

  const url = "https://www.musinsa.com/main/musinsa/ranking";
  await page.goto(url, {
    waitUntil: "domcontentloaded", // DOM이 로드될 때까지 대기
  });

  // #commonLayoutContents > article 요소가 로드될 때까지 대기
  await page.waitForSelector("#commonLayoutContents > article", {
    timeout: 10000,
  });

  // 페이지 HTML 가져오기
  const content = await page.content();
  const $ = cheerio.load(content);

  // .sc-1y072n9-0.jdzDMq 태그 내부의 제품명과 가격 추출
  const products = [];
  $(".sc-1y072n9-0.jdzDMq").each((index, element) => {
    const productName = $(element)
      .find(
        "p.text-body_13px_reg.line-clamp-2.break-all.whitespace-break-spaces.text-black.font-pretendard"
      )
      .text()
      .trim(); // 제품명 추출

    const productPrice = $(element)
      .find(
        "span.text-body_13px_semi.sc-1m4cyao-12.fYDlTs.text-black.font-pretendard"
      )
      .text()
      .trim(); // 가격 추출

    if (productName && productPrice) {
      products.push({ name: productName, price: productPrice });
    }
  });

  console.log("Extracted Products:", products);

  await browser.close();
})();
