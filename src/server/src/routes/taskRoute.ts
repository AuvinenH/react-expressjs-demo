import { Router } from 'express';
import { sayHello } from '../controllers/taskController';
import { getTasks } from '../controllers/taskController';
import { createTask } from '../controllers/taskController';

const router = Router();

// Määritetään GET-reitti /api/hello ja ohjataan pyyntö controller-funktiolle
router.get('/hello', sayHello);
router.get('/tasks', getTasks);
router.post('/post', createTask)

export default router;