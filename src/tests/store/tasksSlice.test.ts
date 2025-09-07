import tasksReducer, { addTask, removeTask } from '../../store/slices/tasksSlice';
import { TasksState } from '../../types';

describe('tasksSlice', () => {
  const initialState: TasksState = {
    tasks: [],
  };

  it('should return the initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addTask', () => {
    const taskDescription = 'Nueva tarea de prueba';
    const actual = tasksReducer(initialState, addTask(taskDescription));
    
    expect(actual.tasks).toHaveLength(1);
    expect(actual.tasks[0].description).toEqual(taskDescription);
    expect(actual.tasks[0].id).toBeDefined();
    expect(actual.tasks[0].createdAt).toBeDefined();
  });

  it('should handle removeTask', () => {
    const existingState: TasksState = {
      tasks: [
        {
          id: '1',
          description: 'Tarea 1',
          createdAt: '2023-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          description: 'Tarea 2',
          createdAt: '2023-01-02T00:00:00.000Z',
        },
      ],
    };

    const actual = tasksReducer(existingState, removeTask('1'));
    
    expect(actual.tasks).toHaveLength(1);
    expect(actual.tasks[0].id).toEqual('2');
  });
});