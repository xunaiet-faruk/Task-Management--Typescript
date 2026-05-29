import type { Task } from "../Types/task";


export const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Learn Framer Motion',
        description: 'Study animations and gestures',
        status: 'in-progress',
        createdAt: new Date()
    },
    {
        id: '2',
        title: 'Build Drag & Drop',
        description: 'Implement dnd-kit for task columns',
        status: 'todo',
        createdAt: new Date()
    },
    {
        id: '3',
        title: 'Create Glassmorphism UI',
        description: 'Design beautiful glass cards',
        status: 'done',
        createdAt: new Date()
    }
];