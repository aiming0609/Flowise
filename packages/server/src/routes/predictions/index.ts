import express, { Router } from 'express'
import multer from 'multer'
import predictionsController from '../../controllers/predictions'
import { getMulterStorage, getUploadPath } from '../../utils'

const router: Router = express.Router()

const upload = multer({ dest: getUploadPath() })

// CREATE
router.post(
    ['/', '/:id'],
    getMulterStorage().array('files'),
    predictionsController.getRateLimiterMiddleware,
    predictionsController.createPrediction
)

export default router
