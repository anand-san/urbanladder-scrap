const axios = require("axios");
const cheerio = require("cheerio");

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

const rs = str => {
    // Remove unnecessary values from string result
    return str.replace(/\n/g, "")
}

(async function main() {
    let finalJson = {
        Navigation: {
            Categories: [],
            items: {
    
            }
        }
    }
  try {
    await fetchHTML("https://urbanladder.com").then(($) => {
        $("#topnav_wrapper ul li").each((index, li) => {
            $(li).find(".topnav_itemname").each((titleIndex, titleElem) => {
                finalJson.Navigation.Categories.push(rs($(titleElem).text()))
                finalJson.Navigation.items[rs($(titleElem).text())] = {}
                $(li).find(".sublist_item .taxontype").each((taxontypeIndex, taxontypeElem) => {
                    finalJson.Navigation.items[rs($(titleElem).text())][rs($(taxontypeElem).text())] = []
                    $(li).find(".sublist_item .taxonslist li").each((taxonslistIndex, taxonslistElem) => {
                        finalJson.Navigation.items[rs($(titleElem).text())][rs($(taxontypeElem).text())].push(rs($(taxonslistElem).text()))
                    })
                })
                
            })
        })
    }).catch(console.log)    
  } catch (e) {
    console.log(e.message || e);
  } finally{
      console.log(JSON.stringify(finalJson))
  }
})();
