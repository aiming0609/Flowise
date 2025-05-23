import express, { Router } from 'express'
import multer from 'multer'
import vectorsController from '../../controllers/vectors'
import { getMulterStorage, getUploadPath } from '../../utils'

const router: Router = express.Router()

const upload = multer({ dest: getUploadPath() })

// CREATE
router.post(
    ['/upsert/', '/upsert/:id'],
    getMulterStorage().array('files'),
    vectorsController.getRateLimiterMiddleware,
    vectorsController.upsertVectorMiddleware
)
router.post(['/internal-upsert/', '/internal-upsert/:id'], getMulterStorage().array('files'), vectorsController.createInternalUpsert)

export default router
