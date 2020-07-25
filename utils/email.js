const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const welcome = require('./templates/welcome');
const resetPassword = require('./templates/passwordReset');
const keys = require('../config/keys');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = 'Rishabh Soni from <sonirishabh72250@gmail.com>';
  }
  newTransport() {
    if (process.env.NODE_ENV !== 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: keys.SENDGRID_USERNAME,
          pass: keys.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: keys.EMAIL_HOST,
      port: keys.EMAIL_PORT,
      auth: {
        user: keys.EMAIL_USERNAME,
        pass: keys.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    let html = '<p>Nature</p>';
    if (template === 'welcome') {
      html = welcome(this.firstName, this.url);
    }
    if (template === 'forgot-password') {
      console.log('send to email -->' + this.to);
      html = resetPassword(this.url);
    }

    const mailOptions = {
      from: this.from,
      to: this.to,
      html,
      subject: subject,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to nature family');
  }
  async sendPasswordReset() {
    await this.send('forgot-password', 'Reset your Nature Password');
  }
};
