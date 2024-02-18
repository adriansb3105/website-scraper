// @ts-check

const { chromium } = require('playwright')

const shops = [
    {
        vendor: 'Microsoft',
        url: 'https://www.xbox.com/es-es/configure/8WJ714N3RBTL',
        checkStock: async ({ page }) => {
            const content = await page.textContent('[aria-label="Finalizar la compra del pack"]')
            return content?.includes('Finalizar la compra')
        }
    },
    {
        vendor: 'Soporte Consolas CR',
        url: 'https://soporteconsolascr.com/products/xbox-series-x-1tb',
        checkStock: async ({ page }) => {
            const content = await page.textContent('#AddToCartText-product-template')
            return content.includes('Agregar al carrito')
        }
    }
]

;(async () => {
    const browser = await chromium.launch({ headless: false })

    for(const shop of shops) {
        const { checkStock, vendor, url } = shop
        
        const page = await browser.newPage()
        await page.goto(url)
        const hasStock = await checkStock({ page })
        
        console.log(`${vendor}: ${hasStock ? 'in stock' : 'out of stock'}`)
        await page.screenshot({ path: `screenshots/${vendor}.png` })

        await page.close()
    }

    await browser.close()
})()
