const Schedule = require('../../models/schedule.model');

allSchedule = [];

module.exports = {
  getCandidateHistory: (req, res) => {
    // console.log('hit');
    console.log(req.params.candidateId, req.params.jobId);
    Schedule.find({
      candidateId: req.params.candidateId,
      jobId: req.params.jobId
    })
      .populate({
        path: 'interviewerId',
        select: 'email',
        model: 'interviewer'
      })
      .lean()
      .exec((err, results) => {
        if (err) throw err;
        else {
          allSchedule = results;
          res.status(200).send(allSchedule);
        }
      });
  },

  submitResponse: (req, res) => {
    console.log(req.body);
    Schedule.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: { status: 'success', remarks: req.body.remarks } },
      (err, data) => {
        if (err) throw err;
        else {
          res.send(data);
        }
      }
    );
  },

  rejectInterview: (req, res) => {
    Schedule.findByIdAndUpdate(
      { _id: req.params.scheduleId },
      { $set: { status: 'ToBeScheduled', remarks: 'Interview Rejected' } },
      (err, data) => {
        if (err) throw err;
        else {
          res.send(data);
        }
      }
    );
  },

  getAllScheduledJobs: (req, res) => {
    Schedule.findOne(
      {
        candidateId: req.body.candidateId,
        jobId: req.body.jobId,
        status: 'pending'
      },
      (err, data) => {
        if (err) throw err;
        else {
          console.log('schedules sent');
          // console.log('*********', data);
          res.json(data);
        }
      }
    );
  }
};
