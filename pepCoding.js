const puppeteer = require("puppeteer");
async function fn() {
    const browserRepresentativeObj = await puppeteer.launch({
        headless: false,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        defaultViewport: null,
        args: ["--start-maximized", "--start-in-incognito"],
        slowMo: 100
    });
    const tab = await browserRepresentativeObj.newPage();
    await tab.goto("https://www.google.com");
    await tab.type("input[type='text']", "pepcoding", { delay: 200 });
    await tab.keyboard.press("Enter");
    await tab.waitForSelector(".LC20lb.MBeuO.DKV0Md", { visible: true });
    await tab.click(".LC20lb.MBeuO.DKV0Md", { delay: 200 });
    await tab.waitForSelector(".site-nav-li", { visible: true });
    await tab.click(".site-nav-li");
    await tab.waitForSelector(".card", { visible: true });

    let coursedetails = await tab.evaluate(browserMCWfn);
    console.table(coursedetails);
    console.log(coursedetails);
    function browserMCWfn() {

        let elemArr = document.querySelectorAll('.card-content.no-padding');
        let detailsArr = [];
        for (let i = 0; i <elemArr.length; i++) {

            let singleCourse = elemArr[i];
            let courseNameElem = singleCourse.querySelector("h3");
            let dateElement = singleCourse.querySelector(".date");

            let featuresArr = singleCourse.querySelectorAll("h5");
            let courseName = courseNameElem.textContent.trim();
            let date = dateElement.textContent.trim();
            let features = "";

            for (let j = 0; j < featuresArr.length; j++) {
                let cFeature = featuresArr[j].textContent.trim();
                features += cFeature + "\n";
            }

            let priceArr = singleCourse.querySelectorAll(".cart-sec h4");
            let price = priceArr.length == 1 ? priceArr[0] : priceArr[1]
            price = price.textContent.trim();
            console.log(courseName, " ", date)
            console.log(features);

            let courseObj = {features, courseName, date, price }


            detailsArr.push(courseObj);
        }

        return detailsArr;
    }

}
fn();
