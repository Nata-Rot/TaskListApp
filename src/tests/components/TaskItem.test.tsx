import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TaskItem } from '../../components/TaskItem/TaskItem';
import { Task } from '../../types';

describe('TaskItem', () => {
  const mockTask: Task = {
    id: '1',
    description: 'Tarea de prueba',
    createdAt: '2023-01-01T00:00:00.000Z',
  };

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(<TaskItem task={mockTask} />);
    
    expect(getByTestId('task-item')).toBeTruthy();
    expect(getByText('Tarea de prueba')).toBeTruthy();
  });

  it('calls onDelete when delete button is pressed', () => {
    const onDeleteMock = jest.fn();
    const { getByTestId } = render(
      <TaskItem task={mockTask} onDelete={onDeleteMock} />
    );

    fireEvent.press(getByTestId('delete-button'));
    
    expect(onDeleteMock).toHaveBeenCalledWith('1');
  });

  it('does not show delete button when onDelete is not provided', () => {
    const { queryByTestId } = render(<TaskItem task={mockTask} />);
    
    expect(queryByTestId('delete-button')).toBeNull();
  });
});