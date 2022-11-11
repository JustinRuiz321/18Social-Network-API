const router = require('express').Router();
const {
  oneThought,
  gatherThoughts,
  newThoughts,
  updateThought,
  deleteThoughts,
} = require('../../controllers/toughts');

router
  .route('/:thoughtId')
  .get(oneThought)
  .get(gatherThoughts)
  .post(newThoughts)
  .put(updateThought)
  .delete(deleteThoughts);

router.route('/').get(gatherThoughts).post(newThoughts);

module.exports = router;