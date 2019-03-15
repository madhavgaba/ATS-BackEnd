const Genre = require('../../models/genre.model');

module.exports = {
  allCategories: (req, res) => {
    Genre.find({}, (err, result) => {
      if (err) throw err;
      else {
        allCategoryList = result;
        res.status(200).send(allCategoryList);
      }
    });
  }
};
