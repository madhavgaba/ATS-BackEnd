const jwt = require('jsonwebtoken');

const Login = require('../../models/login.model');
const Candidate = require('../../models/candidate.model');

module.exports = {
  login: (req, res) => {
    // console.log('came here');

    let loginInfo = new Login(req.body);
    // console.log(loginInfo);
    if (!loginInfo) {
      res.status(400).send('Bad Credentials');
    } else {
      Login.findOne(
        { email: loginInfo.email, password: loginInfo.password },
        (err, user) => {
          if (err) throw err;
          else if (!user)
            return res.json({
              token: null,
              message: 'email or password is incorrect!'
            });
          else {
            if (user.role === 'interviewee') {
              Candidate.findOne(
                { email: loginInfo.email, password: loginInfo.password },
                (err, candidate) => {
                  if (err) throw err;
                  else {
                    let token = jwt.sign(
                      {
                        _id: user.userId,
                        role: user.role,
                        email: candidate.verified.email,
                        mobile: candidate.verified.mobile
                      },
                      'secretkey',
                      {
                        expiresIn: 86400
                      }
                    );
                    res.send({ token: token });
                  }
                }
              );
            } else {
              let token = jwt.sign(
                {
                  _id: user.userId,
                  role: user.role,
                  email: false,
                  mobile: false
                },
                'secretkey',
                {
                  expiresIn: 86400
                }
              );
              res.status(200).send({ token: token });
            }
          }
        }
      );
    }
  }
};
