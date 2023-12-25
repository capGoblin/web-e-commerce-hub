import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    //   "C:\\Users\\dhars\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1",
    headless: false, // Launch a visible browser
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Path to your installed Chrome browser

    userDataDir: `C:\\Users\\dhars\\AppData\\Local\\Google\\Chrome\\User Data`,
    args: [
      "--profile-directory=Default",
      // "--no-sandbox",
      // "--disable-features=ImprovedCookieControls",
      // "--disable-setuid-sandbox",
    ],

    // args: [
    //   //   "--disable-extensions-except=/path/to/my/extension",
    //   //   "--load-extension=/path/to/my/extension",
    //   "--user-data-dir=C:\\Users\\dhars\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1",
    //   //'--profile-directory=Profile 1'
    // ],
    // userDataDir:
  });

  const amazonPage = await browser.newPage();
  await amazonPage.goto("https://www.amazon.com");

  // Wait for the search input field to load and become visible
  await amazonPage.waitForSelector("#twotabsearchtextbox");

  // Type your search query into the search bar
  await amazonPage.type("#twotabsearchtextbox", "Redmi 13C");

  // Simulate pressing the Enter key to submit the search
  await amazonPage.keyboard.press("Enter");

  // Add a delay to allow time for the search results to load
  await amazonPage.waitForTimeout(3000); // Adjust the delay based on the amazonPage load time

  await amazonPage.waitForSelector('[data-component-type="s-search-result"]');

  // Extract information for the first three products
  const AmazonproductInfo = await amazonPage.evaluate(() => {
    const products = Array.from(
      document.querySelectorAll('[data-component-type="s-search-result"]')
    ).slice(0, 10);

    return products.map((product) => {
      const sponsoredElement = product.querySelector(
        ".puis-sponsored-label-text"
      );
      if (sponsoredElement) {
        return null; // Skip sponsored products
      }
      const titleElement = product.querySelector(
        "span.a-size-medium.a-color-base.a-text-normal"
      );
      const title = titleElement
        ? titleElement.textContent?.trim()
        : "No title";

      const imageElement = product.querySelector("img.s-image");
      const imageSrc = imageElement
        ? imageElement.getAttribute("src")
        : "No image";

      const priceElement = product.querySelector("span.a-price-whole");
      const price = priceElement
        ? priceElement.textContent?.trim()
        : "No price";

      return { title, imageSrc, price };
    });
  });

  console.log(AmazonproductInfo);

  // ... Perform scraping logic for Amazon

  // Open a new tab for eBay
  const ebayPage = await browser.newPage();
  await ebayPage.goto("https://www.ebay.com");

  // Wait for the search input field to load and become visible
  await ebayPage.waitForSelector("#gh-ac");

  // Type your search query into the search bar
  await ebayPage.type("#gh-ac", "Redmi 13C");

  // Simulate pressing the Enter key to submit the search
  await ebayPage.keyboard.press("Enter");

  // Wait for the search results to load
  await ebayPage.waitForSelector(".s-item");

  // Extract information for the first three products
  const EbayproductInfo = await ebayPage.evaluate(() => {
    const products = Array.from(document.querySelectorAll(".s-item")).slice(
      1,
      11
    );

    return products.map((product) => {
      const titleElement = product.querySelector(".s-item__title");
      const title = titleElement?.textContent?.trim() ?? "No title";

      const imageElement = product.querySelector(".s-item__image img");
      const imageSrc = imageElement
        ? imageElement.getAttribute("src")
        : "No image";

      const priceElement = product.querySelector(".s-item__price");
      const price =
        priceElement && priceElement.textContent
          ? priceElement.textContent.trim()
          : "No price";

      return { title, imageSrc, price };
    });
  });

  // console.log(productInfo);
  // Display collected information in console
  console.log(EbayproductInfo); // Display collected information in console

  // Close the browser
  // await browser.close();
})();
