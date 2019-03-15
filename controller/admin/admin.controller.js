const Jobs = require('../../models/job.model');
const Interviewer = require('../../models/interviewer.model');
const Genre = require('../../models/genre.model');
const Candidate = require('../../models/candidate.model');
const Schedule = require('../../models/schedule.model');
const JobApplications = require('../../models/jobApplication.model');
const Login = require('../../models/login.model');
const Location = require('../../models/location.model');

let allDesignationList = [];

module.exports = {
  addJob: (req, res) => {
    // console.log('Came here');
    console.log(req.body);
    let jobInfoWithId = {
      jobId: parseInt(Math.random() * 100),
      category: req.body.category,
      designation: req.body.designation,
      description: req.body.description,
      blockJobId: req.body.blockJobId,
      lastDate: req.body.lastDate,
      isOpen: req.body.isOpen,
      paySalary: parseInt(req.body.paySalary),
      location: req.body.location,
      experienceRequired: req.body.experienceRequired,
      bondDetail: req.body.bondDetail,
      skillsRequired: req.body.skillsRequired
    };
    // console.log(Jobs.count);
    let jobInfo = new Jobs(jobInfoWithId);
    jobInfo.save(err => {
      if (err) throw err;
      else res.status(200).send('job added');
    });
  },

  addInterviewer: (req, res) => {
    let interviewerInfo = new Interviewer(req.body);
    let loginInfo = new Login();
    loginInfo.email = interviewerInfo.email;
    loginInfo.password = interviewerInfo.password;
    loginInfo.userId = interviewerInfo._id;
    loginInfo.role = 'interviewer';
    interviewerInfo.save(err => {
      if (err) throw err;
      else {
        loginInfo.save(err => {
          if (err) throw err;
          else {
            res.status(200).send('interviewer added');
          }
        });
      }
    });
  },

  addCategory: (req, res) => {
    console.log(req.body);
    let genreInfo = new Genre(req.body);
    genreInfo.save((err, result) => {
      if (err) throw err;
      else res.status(200).send('Category added');
    });
  },

  addDesignation: (req, res) => {
    let genreInfo = new Genre();

    Genre.findOne({ category: req.body.category }, (err, result) => {
      if (err) throw err;
      let newDesignation = result.designation ? result.designation : [];
      newDesignation.push(req.body.designation);
      Genre.updateOne(
        { category: req.body.category },
        { $set: { designation: newDesignation } },
        err => {
          if (err) throw err;
          else res.status(200).send('designation updated');
        }
      );
    });
  },
  allDesignation: (req, res) => {
    Genre.findById(req.params.category, (err, categoryData) => {
      if (err) throw err;
      else res.send(categoryData);
    });
    // res.status(200).send(allDesignationList);
  },

  allInterviewers: (req, res) => {
    Interviewer.find({}, (err, result) => {
      if (err) throw err;
      else res.status(200).send(result);
    });
  },

  allCandidates: async (req, res) => {
    let usersList = await Candidate.find({});
    let emailsList = usersList.map(value => value.email);
    res.status(200).send(emailsList);
  },

  setSchedule: (req, res) => {
    // console.log(req.body);
    let newSchedule = Schedule(req.body);
    newSchedule.save((err, data) => {
      if (err) throw err;
      else res.status(200).send(data);
    });
  },

  getAllApplicationsWithId: async (req, res) => {
    // console.log(req.body.jobId);
    let candidates = await JobApplications.find({
      jobId: parseInt(req.body.jobId)
    });
    console.log(candidates);
    let candidateId = candidates.map(value => value.email);
    res.status(200).send(candidateEmails);
  },

  trackStatus: (req, res) => {
    Schedule.find({}, (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(result);
      }
    });
  },

  findCandidateById: (req, res) => {
    console.log(req.body);
    Candidate.findById({ _id: req.body.candidateId }, (err, user) => {
      if (err) throw err;
      else {
        res.send(user);
      }
    });
  },

  changeScheduledStatus: (req, res) => {
    console.log('****', req.body.candidateId, req.body.jobId);
    JobApplications.findOneAndUpdate(
      { candidateId: req.body.candidateId, jobId: req.body.jobId },
      { $set: { status: req.body.status } },
      (err, success) => {
        if (err) throw err;
        else {
          console.log('schedule updated');
          res.send();
          // Schedule.findOneAndUpdate(
          //   { candidateId: req.body.candidateId, jobId: req.body.jobId },
          //   { $set: { status: 'pending' } },
          //   err => {
          //     if (err) throw err;
          //     else {
          //       res.send('schedule updated');
          //     }
          //   }
          // );
          // res.send('schedule updated');
        }
      }
    );
  },

  addLocation: (req, res) => {
    let locationInfo = new Location(req.body);
    locationInfo.save(err => {
      if (err) throw err;
      else {
        res.json({ success: true, message: 'Location added successfully' });
      }
    });
  },

  getAllLocations: (req, res) => {
    Location.find({}, (err, data) => {
      if (err) throw err;
      else res.json(data);
    });
  }
};
