import express, { Express } from 'express';
import { userRouter } from './routes/users/';
import { Server } from 'http';
import { LoggerService } from './services/logger';
import { botStart } from './services/telegramBot';

// const getAmwayPage = async () => {
// const url = new URL('https://www.kz.amway.com/search/');
// url.pathname = 'search';
// url.searchParams.append('text', '0014');
// const browser = await puppeteer.

// launch({ headless: false });
//     const url = new URL('https://www.kz.amway.com/search/');
//     url.pathname = 'search';
//     url.searchParams.append('text', '0014');
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     console.log("We are scraping from " + url + ":");
//     await page.goto(url.toString());

//     let hrefs = await page.evaluate(() => {
//         let Element = Array.from(document.body.querySelectorAll('div[data-product-id]'), (el) => {
//             let data = el.getAttribute('data-tealium');
//             if (data) {
//                 data = JSON.parse(data);
//             }
//             return data
//         });
//         return Element;
//     });
//     await browser.close();
//     const obj = hrefs[0];
//     await console.log(obj);
// }

export class App {
    app: Express;
    server: Server;
    PORT: number;
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.app = express();
        this.PORT = 8000;
        this.logger = logger;
    }

    useRoutes() {
        this.app.use('/users', userRouter);
        this.app.get('/', (req, res) => {
            console.log('Hi');
            res.send('Hi');
        })
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.PORT, () => {

            botStart();
            this.logger.log(`Server started on ${this.PORT}`);

            // https.request(new URL('www.kz.amway.com/search/?text=0014'), (res) => {
        });
    }
};
