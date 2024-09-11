import { createTask, deleteTask, getTasks, updateTask } from '@import/controllers'
import { Router } from 'express'

const router = Router()

router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
