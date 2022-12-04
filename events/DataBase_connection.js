const mongoose = require('mongoose');
require('dotenv').config();
const cmd_color = require('chalk');

class Database {
    constructor() {
        this.connection =  null;
    }

    connect() {
        console.log(cmd_color.yellow('Conecting to database...'));

        //local
        /*mongoose.connect(process.env.DB_URL_LOCAL, {
            user: process.env.DB_USER, 
            pass: process.env.DB_PASS,

            useNewUrlParser: true,
            useUnifiedTopology: true
        })*/
        //global
        mongoose.connect(process.env.DB_URL_ONLINE, {
            keepAlive: true,
        })
        
        .then(() => {
            console.log(cmd_color.green('Conected to database successfully.'));
            this.connection = mongoose.connection;
        }).catch(err => {
            console.error(cmd_color.red(`Error occurred while connecting to database: ${err}`));
        })
    }
}

module.exports = Database;