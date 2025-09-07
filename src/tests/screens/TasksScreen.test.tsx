import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { TasksScreen } from '../../screens/TasksScreen/TasksScreen';
import tasksReducer from '../../store/slices/tasksSlice';
import listReducer from '../../store/slices/listSlice';
import { RootState } from '../../store'; 

const createMockStore = (initialState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
      list: listReducer,
    },
    preloadedState: {
      tasks: { tasks: [] },
      list: { items: [], loading: false, error: null }, 
      ...initialState,
    } as RootState,
  });
};

describe('TasksScreen', () => {
  it('renders correctly with empty state', () => {
    const store = createMockStore();
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <TasksScreen />
      </Provider>
    );

    expect(getByText('My Tasks (0)')).toBeTruthy();
    expect(getByText('No tasks created')).toBeTruthy();
    expect(getByTestId('add-task-button')).toBeTruthy();
  });

  it('shows modal when add task button is pressed', () => {
    const store = createMockStore();
    const { getByTestId } = render(
      <Provider store={store}>
        <TasksScreen />
      </Provider>
    );

    fireEvent.press(getByTestId('add-task-button'));
    expect(getByTestId('task-modal')).toBeTruthy();
  });

  it('renders tasks when they exist', () => {
    const store = createMockStore({
      tasks: {
        tasks: [
          {
            id: '1',
            description: 'Tarea de prueba',
            createdAt: '2023-01-01T00:00:00.000Z',
          },
        ],
      },
    });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <TasksScreen />
      </Provider>
    );

    expect(getByText('My Tasks (1)')).toBeTruthy();
    expect(getByTestId('tasks-list')).toBeTruthy();
    expect(getByText('Tarea de prueba')).toBeTruthy();
  });
});