const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

function login(driver, uname, pwd)
{
    console.log('Opening Meetup');
    driver.get('https://secure.meetup.com/login/');
    driver.wait(until.elementsLocated(By.name('email')), 10000).then (_ => console.log('About to login'));
    driver.findElement(By.name('email')).sendKeys(uname);
    driver.findElement(By.name('password')).sendKeys(pwd);
    driver.findElement(By.name('submitButton')).click();
}

exports.login=login; 
