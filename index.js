const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        args: ["--start-maximized",'--use-gl=desktop'],
	});
    const page = await browser.newPage();
    page.setViewport({ width: 1680, height: 1050 })
    //console.log(ws)
    await page.goto('http://www.rpachallenge.com/');

    
    await page.evaluate(() => {
        document.querySelector('.btn-large').click()
    });
    for(let i in ws){
        var nodeEl = ws[i]
        await page.evaluate((nodeEl) => {
            document.querySelector('input[ng-reflect-name="labelAddress"]').value = nodeEl['Address'];
            document.querySelector('input[ng-reflect-name="labelFirstName"]').value = nodeEl['First Name'];
            document.querySelector('input[ng-reflect-name="labelEmail"]').value = nodeEl['Email'];
            document.querySelector('input[ng-reflect-name="labelLastName"]').value = nodeEl['Last Name '];
            document.querySelector('input[ng-reflect-name="labelCompanyName"]').value = nodeEl['Company Name'];
            document.querySelector('input[ng-reflect-name="labelPhone"]').value = nodeEl['Phone Number'];
            document.querySelector('input[ng-reflect-name="labelRole"]').value = nodeEl['Role in Company'];
            document.querySelector('input[value="Submit"]').click();
        },nodeEl)

    }

})();

const excel = xlsx.readFile("challenge.xlsx");
const ws = xlsx.utils.sheet_to_json(excel.Sheets["Sheet1"])

