const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    return new Promise((resolve, reject) => {
      try {
        this.transporter
          .sendMail({
            ...mailConfig.default,
            ...message,
          })
          .then(response => {
            resolve(response);
          });
      } catch (err) {
        reject(err.message);
      }
    });
  }
}

module.exports = new Mail();
