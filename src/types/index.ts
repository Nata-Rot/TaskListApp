export interface Task {
  id: string;
  description: string;
  createdAt: string;
}

export interface ListItem {
  id: string;
  name: string;
  avatar?: string;
}

export interface RootState {
  tasks: TasksState;
  list: ListState;
}

export interface TasksState {
  tasks: Task[];
}

export interface ListState {
  items: ListItem[];
  loading: boolean;
  error: string | null;
}