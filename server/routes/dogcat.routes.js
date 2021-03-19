import express from 'express'
import dogCtrl from '../controllers/dog.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

//routes for the dog
router.route('/dogcat/dog/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.getdog)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.addDogClick)

  //seperate route to add like
router.route('/dogcat/dog/like/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.addDogLike)

  //seperate route to remove like
router.route('/dogcat/dog/dislike/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.removeDogLike)


router.route('/dogcat/cat/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.getcat)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.addCatClick)

router.route('/dogcat/cat/like/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.addCatLike)

router.route('/dogcat/cat/dislike/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.removeCatLike)

router.param('userId', userCtrl.userByID)
export default router