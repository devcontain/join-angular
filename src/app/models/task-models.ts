export interface Task {
    id: number;
    title: string;
    description: string;
    date: string;
    category: string;
    prio: 'urgent' | 'medium' | 'low';
    subtasks: Subtask[];
    contacts: Contact[];
}

export interface Subtask {
    id: number;
    name: string;
    isChecked: boolean;
}

export interface Contact {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    color: string;
}