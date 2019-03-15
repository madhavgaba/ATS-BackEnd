const Interviewer = require('../../models/interviewer.model');
const Schedules = require('../../models/schedule.model');
const emailService = require('../../sendgrid/send');

module.exports = {
  getInterviewerById: (req, res) => {
    Interviewer.findById({ _id: req.body.interviewerId }, (err, result) => {
      if (err) throw err;
      else {
        res.send(result);
      }
    });
  },

  getAllSchedulesForInterviewer: (req, res) => {
    console.log('INTERVIEWER', req.body.interviewerId);
    Schedules.find({
      interviewerId: req.body.interviewerId,
      status: 'pending'
    })
      .populate('jobId', 'jobId category designation', 'jobs')
      .populate('candidateId', 'email', 'candidate')
      .exec((err, result) => {
        if (err) throw err;
        else {
          console.log(result);
          res.status(200).send(result);
        }
      });
  },

  sendCredentials: (req, res) => {
    console.log(req.body);
    let credentials = {
      email: req.body.email,
      password: req.body.password
    };
    emailService.sendEmailToInterviewer(
      credentials.email,
      'Account Activation',
      credentials
    );
    res.json({ success: true, message: 'mail successfully sent' });
  }
};
