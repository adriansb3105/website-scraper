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
    },
    {
        vendor: 'El Corte Ingles',
        url: 'https://www.elcorteingles.es/videojuegos/A37047078-xbox-series-x',
        checkStock: async ({ page }) => {
            const content = await page.textContent('.product_detail-add_to_cart')
            return content.includes('Añadir a la cesta')
        }
    }
    /*{
        vendor: 'Fnac',
        url: 'https://www.fnac.es/Consola-Xbox-Series-X-Diablo-IV-Videoconsola-Consola/a10276544',
        checkStock: async ({ page }) => {
            const content = await page.textContent('[data-automation-id="product-buy-btn"]')
            return content.includes('Añadir a la cesta')
        }
    },
    {
        vendor: 'Amazon',
        url: 'https://www.amazon.com/-/es/Xbox-Forza-Horizons-Console-Bundle-X/dp/B0BNWDC18R/ref=sr_1_3',
        checkStock: async ({ page }) => {
            const addToCartButton = await page.$$('#add-to-cart-button') //Return an array
            console.log(addToCartButton);
            return addToCartButton.length > 0
        }
    }*/ //Disabled for now cause is not working properly
]

;(async () => {
    const browser = await chromium.launch({ headless: false })

    for(const shop of shops) {
        const { checkStock, vendor, url } = shop
        
        const page = await browser.newPage()
        await page.goto(url)
        const hasStock = await checkStock({ page })
        
        console.log(`${vendor}: ${hasStock ? 'HAS STOCK!!!' : 'Out of Stock'}`)
        //await page.screenshot({ path: `screenshots/${vendor}.png` })

        await page.close()
    }

    await browser.close()
})()
