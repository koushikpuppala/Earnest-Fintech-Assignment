import { createTask, deleteTask, getTask, getTasks, updateTask } from '@import/controllers'
import { Router } from 'express'

const router = Router()

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
