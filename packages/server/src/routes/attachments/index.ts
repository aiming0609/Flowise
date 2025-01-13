import express, { Router } from 'express'
import multer from 'multer'
import attachmentsController from '../../controllers/attachments'
import { getMulterStorage } from '../../utils'

const router: Router = express.Router()

const upload = multer({ dest: getUploadPath() })

// CREATE
router.post('/:chatflowId/:chatId', getMulterStorage().array('files'), attachmentsController.createAttachment)

export default router
