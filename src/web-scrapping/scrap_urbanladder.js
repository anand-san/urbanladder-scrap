const axios = require("axios");
const cheerio = require("cheerio");
async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

async function getProductImages(purl) {
  try {
    const { data } = await axios.get(purl);
    const $ = cheerio.load(data);
    const products = [];
    $(".clearfix .columns.sixteen .categories.row .category_section ul li").map(
      (index, li) => {
        const pdetails = $(li).find(
          ".productbox .product-info-block a .product-title"
        );
        const pImage = $(li).find(".productbox .product-img img").attr("src");
        const price = $(li)
          .find(".productbox .product-info-block a .price-number span")
          .text();
        const emi_price = $(li)
          .find(".productbox .product-info-block a .price-text span")
          .text();
        if (pImage)
          products.push({
            Name: $(pdetails).find("span").text(),
            Image: pImage,
            Description: $(pdetails).find("div").text(),
            Price: price.replace(",", "").replace("₹", ""),
            Emi: emi_price.replace(",", "").replace("₹", ""),
            Rating: Math.floor(Math.random() * 11),
          });
      }
    );
    return products.filter((p) => p);
  } catch (err) {
    console.error("Error : ", err);
  }
}
const rs = (str) => {
  // Remove unnecessary values from string result
  return str.replace(/\n/g, "");
};
(async function main() {
  let finalJson = {
    Navigation: {
      Categories: [],
      items: {},
    },
  };
  try {
    await fetchHTML("https://urbanladder.com")
      .then(async ($) => {
        await Promise.all(
          $("#topnav_wrapper ul li").map(async (index, li) => {
            await Promise.all(
              $(li)
                .find(".topnav_itemname")
                .map(async (titleIndex, titleElem) => {
                  finalJson.Navigation.Categories.push(rs($(titleElem).text()));
                  finalJson.Navigation.items[rs($(titleElem).text())] = {};
                  await Promise.all(
                    $(li)
                      .find(".sublist_item")
                      .map(async (subListItemIndex, subListItemType) => {
                        const itemType = $(subListItemType).find(".taxontype");
                        const items = $(subListItemType).find(".taxonslist li");
                        finalJson.Navigation.items[rs($(titleElem).text())][
                          rs($(itemType).text())
                        ] = {};

                        await Promise.all(
                          items.map(async (taxonslistIndex, taxonslistElem) => {
                            const rel = $(taxonslistElem)
                              .find("a")
                              .attr("href");
                            const url = `https://www.urbanladder.com${rel}`;
                            const productData = await getProductImages(url);
                            finalJson.Navigation.items[rs($(titleElem).text())][
                              rs($(itemType).text())
                            ][rs($(taxonslistElem).text())] = productData;
                          })
                        );
                      })
                  );
                })
            );
          })
        );
      })
      .catch(console.log);
  } catch (e) {
    console.log(e.message || e);
  } finally {
    console.log(JSON.stringify(finalJson));
  }
})();