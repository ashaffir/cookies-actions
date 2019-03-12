const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/cookies.db');


const writeDb = (domain, expiery, httpOnly, name, path, secure, value) => {
    db.run('CREATE TABLE IF NOT EXISTS cookies(domain TEXT, expiry INTEGER, httpOnly TEXT, name TEXT, path TEXT, secure TEXT, value TEXT)');
    
    db.run('INSERT INTO cookies(domain, expiery, httpOnly, name, path, secure, value) VALUES(?,?,?,?,?,?,?)',
    [domain, expiery, httpOnly, name, path, secure, value],
    function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
      db.close();
}

exports.writeDb = writeDb;

