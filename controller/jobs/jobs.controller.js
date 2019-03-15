const Jobs = require('../../models/job.model');
const Application = require('../../models/jobApplication.model');
const Candidate = require('../../models/candidate.model');

let allJobsList = [];

module.exports = {
  getAllJobs: async (req, res) => {
    Jobs.find({}, (err, listOfJobs) => {
      if (err) throw err;
      else res.status(200).send(listOfJobs);
    });
  },

  getAllJobIDs: (req, res) => {
    Jobs.find({}, { _id: 1, category: 1, designation: 1 }, (err, data) => {
      if (err) throw err;
      else res.json(data);
    });
  },

  applyJob: (req, res) => {
    let applicationInfo = new Application();
    applicationInfo.candidateId = req.body.candidateId;
    applicationInfo.jobId = req.body.jobId;
    applicationInfo.status = 'ToBeScheduled';

    Candidate.findById({ _id: req.body.candidateId }, (err, user) => {
      if (err) throw err;
      else {
        console.log(user.applied);
        console.log(req.body.jobId);
        let isJobAlreadyApplied = false;
        user.applied.map(value => {
          if (value === req.body.jobId) isJobAlreadyApplied = true;
        });
        // console.log(isJobAlreadyApplied);
        if (isJobAlreadyApplied) {
          res.json({ success: false, message: 'Job already applied' });
        } else {
          let appliedJobs = user.applied;
          appliedJobs.push(req.body.jobId);
          // console.log(appliedJobs);
          Candidate.findByIdAndUpdate(
            { _id: req.body.candidateId },
            { $set: { applied: appliedJobs } },
            err => {
              if (err) throw err;
              else {
                applicationInfo.save((err, result) => {
                  if (err) throw err;
                  else {
                    res.json({
                      success: true,
                      message: 'Job successfully applied'
                    });
                  }
                });
              }
            }
          );
        }
      }
    });

    // applicationInfo.save(async (err, result) => {
    //   if (err) throw err;
    // else {
    //   let user = await Candidate.findById({ _id: req.body.candidateId });
    //   let appliedJobs = user.applied;
    //   let isJobAlreadyApplied = appliedJobs.map(
    //     value => value == req.body.jobId
    //   );
    //   if (isJobAlreadyApplied) {
    //     res
    //       .status(200)
    //       .json({ sucess: false, message: 'job already applied' });
    //   } else {
    //     appliedJobs.push(req.body.jobId);
    //     console.log(req.body.candidateId);
    //     Candidate.findByIdAndUpdate(
    //       { _id: req.body.candidateId },
    //       { $set: { applied: appliedJobs } },
    //       err => {
    //         if (err) throw err;
    //         else
    //           res.status(200).json({
    //             success: true,
    //             message: 'job application successfull'
    //           });
    //       }
    //     );
    //   }
    // }
    // });
  },

  jobDetails: (req, res) => {
    Jobs.findOne({ jobId: parseInt(req.params.id) }, (err, result) => {
      if (err) throw err;
      else res.status(200).send(result);
    });
  },

  getCandidatesForJob: (req, res) => {
    console.log(req.body.param);
    Application.find({ jobId: req.body.param, status: 'ToBeScheduled' })
      .populate([
        { path: 'candidateId', select: 'name email', model: 'candidate' }
      ])
      .lean()
      .exec((err, applied) => {
        if (err) throw err;
        else {
          console.log(applied);
          res.json(applied);
        }
      });
  },

  getJobForId: (req, res) => {
    // console.log(req.body.jobId);
    Jobs.findById({ _id: req.body.jobId }, (err, result) => {
      if (err) throw err;
      else {
        res.json({ jobId: result.jobId });
      }
    });
  },

  closeApplication: (req, res) => {
    console.log('api hit');
    Application.findOneAndUpdate(
      { jobId: req.body.jobId, candidateId: req.body.candidateId },
      { $set: { status: req.body.status } },
      { new: true },
      (err, saved) => {
        if (err) throw err;
        else {
          res.json(saved);
        }
      }
    );
  },

  getAllApplications: (req, res) => {
    Application.find({ jobId: req.body.jobId })
      .populate('candidateId', 'name email', 'candidate')
      .populate('jobId', 'category designation', 'jobs')
      .lean()
      .exec((err, results) => {
        if (err) throw err;
        res.json(results);
      });
  }
};
