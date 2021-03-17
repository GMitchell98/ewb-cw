import express from 'express'
import dogCtrl from '../controllers/dog.controller'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/dogcat/dog/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.getdog)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.addDogClick)


router.route('/dogcat/cat/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.getcat)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, dogCtrl.addCatClick)


router.param('userId', userCtrl.userByID)
export default router