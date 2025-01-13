import express, { Router } from 'express'
import multer from 'multer'
import openaiAssistantsController from '../../controllers/openai-assistants'
import { getMulterStorage } from '../../utils'

const router: Router = express.Router()
const upload = multer({ dest: getUploadPath() })

router.post('/download/', openaiAssistantsController.getFileFromAssistant)
router.post('/upload/', getMulterStorage().array('files'), openaiAssistantsController.uploadAssistantFiles)

export default router
