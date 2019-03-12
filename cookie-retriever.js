// This module with handle the logging into the webiste and saving all coockies into the database

/* 
driver.manage().getCookies();   // Return The List of all Cookies
driver.manage().getCookieNamed(arg0);  //Return specific cookie according to name
driver.manage().addCookie(arg0);   //Create and add the cookie
driver.manage().deleteCookie(arg0);  // Delete specific cookie
driver.manage().deleteCookieNamed(arg0); // Delete specific cookie according Name
driver.manage().deleteAllCookies();  // Delete all cookies
 */

//Log into the website
const login = require('./modules/login');
const webdriver = require('selenium-webdriver');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/cookies.db');
db.run('CREATE TABLE IF NOT EXISTS cookies(domain TEXT, expiry INTEGER, httpOnly TEXT, name TEXT, path TEXT, secure TEXT, value TEXT)');


const writeDB = (domain, expiry, httpOnly, name, path, secure, value) => {
    
    db.run('INSERT INTO cookies(domain, expiry, httpOnly, name, path, secure, value) VALUES(?,?,?,?,?,?,?)',
    [domain, expiry, httpOnly, name, path, secure, value],
    function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
}

const closeDB = () => {
    db.close()
}

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

login.login(driver, 'alfredo.intl@gmail.com', '-pl,mko0');

const printCookies = () => {

    console.log("Retrieving coockies...");

    driver.manage().getCookies().then( (loadedCookies) =>{
        console.log(loadedCookies);
        for (let i=0; i<= loadedCookies.length-1;i++) {
            console.log('printing cookie loaded : '+loadedCookies[i]);
            writeDB(
                loadedCookies[i]['domain'],
                loadedCookies[i]['expiry'],
                loadedCookies[i]['httpOnly'],
                loadedCookies[i]['name'],
                loadedCookies[i]['path'],
                loadedCookies[i]['secure'],
                loadedCookies[i]['value']
            );
        }
        });
}


setTimeout(printCookies, 10000);
// setTimeout(closeDB, 10000);



