const jwt = require('jsonwebtoken');
const path = require('path');

const Candidate = require('../../models/candidate.model');
const Login = require('../../models/login.model');
const JobApplications = require('../../models/jobApplication.model');
const Otp = require('../../models/otp.model');
const Schedules = require('../../models/schedule.model');
const Request = require('request');
const randomstring = require('randomstring');
const emailService = require('../../sendgrid/send');
const Email = require('../../models/email.model');
const keys = require('../../config/keys');

module.exports = {
  signUp: (req, res) => {
    // console.log(req.files);
    console.log(req.body);

    // console.log('hit');

    let userInfo = new Candidate();
    console.log('****', req.files);
    userInfo.name = req.body.name;
    userInfo.password = req.body.password;
    userInfo.email = req.body.email;
    userInfo.phoneNumber = req.body.phoneNumber;
    userInfo.cgpa = req.body.cgpa;
    userInfo.resume = req.files.resume[0].filename;
    userInfo.video = req.files.video[0].filename;
    userInfo.previousEmployee = req.body.previousEmployee;
    userInfo.education.college = req.body.college;
    userInfo.education.completionDate = req.body.completionDate;
    userInfo.education.degree = req.body.degree;
    userInfo.experience = req.body.experience;
    userInfo.residence.address = req.body.address;
    userInfo.residence.landmark = req.body.landmark;
    userInfo.residence.pincode = req.body.pincode;
    console.log(userInfo);
    let infoWithRole = {
      email: req.body.email,
      password: req.body.password,
      role: 'interviewee',
      userId: userInfo._id
    };
    let info = new Login(infoWithRole);
    // console.log(req.body);

    if (!userInfo) {
      res.status(400).send('Invalid details');
    } else {
      jwt.sign(
        { userInfo },
        'secretkey',
        { expiresIn: '30days' },
        (err, token) => {
          userInfo.save(err => {
            if (err) throw err;
            else {
              info.save(err => {
                if (err) throw err;
                else res.json(token);
              });
            }
          });
        }
      );
    }
  },

  getAllAppliedJobs: (req, res) => {
    console.log(req.body.candidateId);
    JobApplications.find({
      candidateId: req.body.candidateId
    })
      .populate({
        path: 'jobId',
        select: 'jobId category designation',
        model: 'jobs'
      })
      .exec((err, fields) => {
        if (err) throw err;
        else {
          console.log(fields.length);
          // res.send(fields);
          let cnt = 0;
          fields.forEach((element, index) => {
            if (element.status === 'InterviewScheduled') {
              Schedules.findOne(
                {
                  candidateId: req.body.candidateId,
                  jobId: element.jobId._id
                },
                (err, data) => {
                  if (err) throw err;
                  else {
                    element.date = data.date;
                    element.time = data.time;
                    console.log(element.date + element.time);
                    // fields[index].time = data.time;
                    // console.log('----------------', fields[index]);
                  }
                }
              );
            }
            cnt++;
            console.log(cnt === fields.length);
            if (cnt >= fields.length) {
              console.log('sent', cnt);
              res.send(fields);
            }
          });

          // Schedules.find(
          //   { candidateId: req.body.candidateId, status: 'InterviewScheduled' },
          //   (err, data) => {
          //     if (err) throw err;
          //     else {
          //       console.log('*****', fields);
          //       res.send(fields);
          // obj.date = data.date;
          // obj.time = date.time;
          // console.log(fields);
          // }
          // }
          // );
        }
      });
  },

  getCandidateProfile: (req, res) => {
    Candidate.findById(req.params.id, (err, data) => {
      if (err) throw err;
      else {
        res.send(data);
      }
    });
  },

  getUploads: (req, res) => {
    res.sendFile(
      path.resolve(`${__dirname}/../../assets/${req.params.fileName}`)
    );
  },

  createOtp: (req, res) => {
    let valueOtp = Math.floor(100000 + Math.random() * 900000);
    console.log('otp', valueOtp);
    let otpInfo = new Otp({
      userId: req.body.userId,
      role: req.body.role,
      timestamp: Date.now(),
      valueOtp: valueOtp,
      type: req.body.type,
      expiry: ''
    });
    // send message on user phone
    Candidate.findById(req.body.userId, (err, res) => {
      if (err) throw err;
      Request.get(
        `https://2factor.in/API/V1/${keys.SMS_KEY}/SMS/${
          res.phoneNumber
        }/${valueOtp}`,
        (err, msg) => {
          if (err) throw err;
          console.log('Message Sent');
        }
      );
    });
    otpInfo.save((err, data) => {
      if (err) throw err;
      else console.log('otp generated');
      res.status(200).send({ data });
    });
  },
  matchOtp: (req, res) => {
    Otp.findOne(
      { userId: req.params.candidateId, valueOtp: req.params.otp },
      (err, data) => {
        if (err) throw err;
        let status = 'true';

        if (data === null) {
          status = 'false';
          res.status(200).send({ status: status });
        } else {
          console.log('Hey mad ', req.params.candidateId);
          Candidate.findByIdAndUpdate(
            req.params.candidateId,
            {
              $set: { 'verified.mobile': true }
            },
            { new: true },
            (err, saved) => {
              console.log(saved);
              res.status(200).send({ status: status });
            }
          );
        }
      }
    );
  },
  createEmail: (req, res) => {
    let token = randomstring.generate();
    let emailInfo = new Email({
      userId: req.body.userId,
      token: token,
      isActive: true
    });
    Candidate.findById(req.body.userId, (err, data) => {
      if (err) throw err;
      else {
        //send email
        let link = `http://localhost:4200/emailverify/${token}`;
        emailService.sendEmail(data.email, link);
        emailInfo.save((nerr, emailData) => {
          if (nerr) throw nerr;
          else {
            res.status(200).json({ status: 'true' });
          }
        });
      }
    });
  },
  matchEmail: (req, res) => {
    Email.findOne({ token: req.params.id }, (err, data) => {
      if (err) throw err;
      if (data === null) {
        res.status(200).send({ status: false });
      } else {
        Candidate.findByIdAndUpdate(
          data.userId,
          { $set: { 'verified.email': true } },
          { new: true },
          (nerr, result) => {
            if (nerr) throw nerr;
            else {
              console.log('Email matched');
              console.log(result);
              res.status(200).json({ status: true });
            }
          }
        );
      }
    });
  },

  getAllDetailsOfCandidate: (req, res) => {
    Candidate.findById(req.body.candidateId, (err, user) => {
      if (err) throw err;
      else {
        res.send(user);
      }
    });
  },

  onProfileUpdate: (req, res) => {
    // console.log(req.body.profile.name);
    Candidate.findByIdAndUpdate(
      req.body.profile.candidateId,
      {
        $set: {
          'residence.address': req.body.profile.address,
          'residence.pincode': req.body.profile.pincode,
          'residence.landmark': req.body.profile.landmark,
          experience: req.body.profile.experience,
          cgpa: req.body.profile.cgpa,
          previousEmployee: req.body.profile.previousEmployee,
          'education.degree': req.body.profile.degree,
          'education.college': req.body.profile.college,
          name: req.body.profile.name
        }
      },
      (err, returned) => {
        if (err) throw err;
        console.log(returned);
        res.json({ success: true, message: 'profile updated' });
      }
    );
  }
};
