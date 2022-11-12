const router = require('express').Router();
//Functions being called from controllers folder for thoughts actions
const {
    gatherThoughts,
    oneThought,
    newThought,
    changeThought,
    removeThought,
    thoughtReaction,
    removeReaction,
} = require('../../controllers/thoughts');
//Opening route
router.route('/').get(gatherThoughts).post(newThought);
//Route with specific Thought ID
router.route('/:thoughtId')
.get(oneThought)
.put(changeThought)
.delete(removeThought);

//Routes for reactions
router.route('/:thoughtId/reactions').post(thoughtReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;