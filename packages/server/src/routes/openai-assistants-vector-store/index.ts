import express, { Router } from 'express'
import multer from 'multer'
import openaiAssistantsVectorStoreController from '../../controllers/openai-assistants-vector-store'
import { getMulterStorage, getUploadPath } from '../../utils'

const router: Router = express.Router()
const upload = multer({ dest: getUploadPath() })

// CREATE
router.post('/', openaiAssistantsVectorStoreController.createAssistantVectorStore)

// READ
router.get('/:id', openaiAssistantsVectorStoreController.getAssistantVectorStore)

// LIST
router.get('/', openaiAssistantsVectorStoreController.listAssistantVectorStore)

// UPDATE
router.put(['/', '/:id'], openaiAssistantsVectorStoreController.updateAssistantVectorStore)

// DELETE
router.delete(['/', '/:id'], openaiAssistantsVectorStoreController.deleteAssistantVectorStore)

// POST
router.post('/:id', getMulterStorage().array('files'), openaiAssistantsVectorStoreController.uploadFilesToAssistantVectorStore)

// DELETE
router.patch(['/', '/:id'], openaiAssistantsVectorStoreController.deleteFilesFromAssistantVectorStore)

export default router
