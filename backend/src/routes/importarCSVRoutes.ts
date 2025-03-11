import express from 'express'
import upload from '../middleware/multer'
import { importCSV } from '../controllers/importarCSVController'

const router = express.Router()

router.post('/importar_csv', upload.single('file'), importCSV)

export default router
