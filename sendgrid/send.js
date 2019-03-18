const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

module.exports = {
  sendEmail: (receiver, link) => {
    sgMail.setApiKey(`${keys.EMAIL_KEY}`);

    console.log('reciever ', receiver);

    const msg = {
      to: receiver,
      from: 'support@atsgem.in',
      subject: link,
      html: '<strong>Click on this link to verify</strong>'
    };
    sgMail.send(msg, (err, res) => {
      console.log(err);
    });
  },

  sendEmailToInterviewer: (receiver, link, credentials) => {
    sgMail.setApiKey(keys.EMAIL_KEY);

    const msg = {
      to: receiver,
      from: 'support@gemini.in',
      subject: link,
      html: `${credentials.email} ${credentials.password}`
    };
    console.log('**********', msg);
    sgMail.send(msg, (err, success) => {
      if (err) throw err;
      else {
        console.log('message sent');
      }
    });
  }
};
