import type { Task } from '../models/task';

export const todo: Task[] = [
    {
        id: 1,
        title: 'Implement User Authentication',
        description: 'Integrate secure login, session handling and access control for registered users.',
        date: '30/10/2026',
        category: 'Technical Task',
        prio: 'urgent',
        subtasks: [
            { id: 1, name: 'Implement login endpoint', isChecked: true },
            { id: 2, name: 'Validate user sessions', isChecked: false },
            { id: 3, name: 'Test access restrictions', isChecked: false },
        ],
        contacts: [
            {
                id: 1,
                firstname: 'Sofia',
                lastname: 'Müller',
                email: 'sofia@example.com',
                phone: '+49 1111 111 11 1',
                color: '#00BEE8'
            }
        ]
    },
    {
        id: 2,
        title: 'Improve Mobile Navigation',
        description: 'Optimize navigation and interactive elements for smartphones and tablets.',
        date: '04/11/2026',
        category: 'User Story',
        prio: 'medium',
        subtasks: [
            { id: 1, name: 'Review responsive breakpoints', isChecked: true },
            { id: 2, name: 'Improve mobile menu', isChecked: false },
            { id: 3, name: 'Test different screen sizes', isChecked: false },
        ],
        contacts: [
            {
                id: 2,
                firstname: 'Anton',
                lastname: 'Mayer',
                email: 'anton@example.com',
                phone: '+49 1111 111 11 1',
                color: '#FF7A00'
            }
        ]
    },
    {
        id: 3,
        title: 'Write API Documentation',
        description: 'Document available API endpoints, request parameters and response formats.',
        date: '06/11/2026',
        category: 'Technical Task',
        prio: 'low',
        subtasks: [
            { id: 1, name: 'Document authentication endpoints', isChecked: false },
            { id: 2, name: 'Add example API responses', isChecked: false },
        ],
        contacts: [
            {
                id: 3,
                firstname: 'Anja',
                lastname: 'Schulz',
                email: 'anja@example.com',
                phone: '+49 1111 111 11 1',
                color: '#9327FF'
            }
        ]
    },
];

export const tasksinprogress: Task[] = [
    {
        id: 4,
        title: 'Develop Dashboard Components',
        description: 'Build reusable dashboard components with dynamic task statistics.',
        date: '29/10/2026',
        category: 'Technical Task',
        prio: 'medium',
        subtasks: [
            { id: 1, name: 'Create dashboard layout', isChecked: true },
            { id: 2, name: 'Integrate task statistics', isChecked: true },
            { id: 3, name: 'Optimize component rendering', isChecked: false },
        ],
        contacts: [
            {
                id: 4,
                firstname: 'Benedikt',
                lastname: 'Ziegler',
                email: 'benedikt@example.com',
                phone: '+49 1111 111 11 1',
                color: '#6E52FF'
            }
        ]
    },
    {
        id: 5,
        title: 'Implement Data Validation',
        description: 'Add client-side and server-side validation for form submissions.',
        date: '28/10/2026',
        category: 'Technical Task',
        prio: 'urgent',
        subtasks: [
            { id: 1, name: 'Define validation rules', isChecked: true },
            { id: 2, name: 'Implement error messages', isChecked: false },
            { id: 3, name: 'Test invalid input scenarios', isChecked: false },
        ],
        contacts: [
            {
                id: 5,
                firstname: 'David',
                lastname: 'Eisenberg',
                email: 'david@example.com',
                phone: '+49 1111 111 11 1',
                color: '#FC71FF'
            }
        ]
    },
];

export const awaitingfeedback: Task[] = [
    {
        id: 6,
        title: 'Review Landing Page Design',
        description: 'Review visual consistency, typography, spacing and accessibility.',
        date: '26/10/2026',
        category: 'User Story',
        prio: 'low',
        subtasks: [
            { id: 1, name: 'Complete desktop design', isChecked: true },
            { id: 2, name: 'Collect stakeholder feedback', isChecked: false },
        ],
        contacts: [
            {
                id: 6,
                firstname: 'Eva',
                lastname: 'Fischer',
                email: 'eva@example.com',
                phone: '+49 1111 111 11 1',
                color: '#FFBB2B'
            }
        ]
    },
    {
        id: 7,
        title: 'Test Login and Logout Flow',
        description: 'Verify successful authentication, logout behavior and session expiration.',
        date: '27/10/2026',
        category: 'Technical Task',
        prio: 'medium',
        subtasks: [
            { id: 1, name: 'Complete functional testing', isChecked: true },
            { id: 2, name: 'Review QA test results', isChecked: false },
        ],
        contacts: [
            {
                id: 7,
                firstname: 'Niklas',
                lastname: 'Rupert',
                email: 'niklas@example.com',
                phone: '+49 1111 111 11 1',
                color: '#00BEE8'
            }
        ]
    },
];

export const done: Task[] = [
];
