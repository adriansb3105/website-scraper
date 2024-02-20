// @ts-check

import { collectTableWithHeaders } from 'playwright-table'
import { chromium } from 'playwright'

const SITE = 'https://finviz.com/screener.ashx?v=111&s=ta_topgainers'

;(async () => {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage()

    try {
        await page.goto(SITE, {timeout:70000})
    } catch(error) {
        throw new Error(error)
    }
    
    await page.waitForSelector('.screener_table')

    let rows = await collectTableWithHeaders({
      page,
      selector: '.screener_table',
    })

    const stocks = []
    
    if (rows) {
        rows.map((gainer) => {
            const stock = JSON.parse(`{
                "No":"${Object.entries(gainer)[0][1]}",
                "Ticker":"${Object.entries(gainer)[1][1]}",
                "Company":"${Object.entries(gainer)[2][1]}",
                "Sector":"${Object.entries(gainer)[3][1]}",
                "Industry":"${Object.entries(gainer)[4][1]}",
                "Country":"${Object.entries(gainer)[5][1]}",
                "Market_Cap":"${Object.entries(gainer)[6][1]}",
                "P_E":"${Object.entries(gainer)[7][1]}",
                "Price":"${Object.entries(gainer)[8][1]}",
                "Change":"${Object.entries(gainer)[9][1]}",
                "Volume":"${Object.entries(gainer)[10][1]}"
            }`)

            stocks.push(stock)
        })
    }

    //console.log(stocks[3].Market_Cap);
    console.log(stocks);

    await page.close()
    await browser.close()
})()
