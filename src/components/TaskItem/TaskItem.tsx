import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onDelete?: (id: string) => void;
}

// Icon components
const TaskIcon = () => (
  <Text style={iconStyles.taskIcon}>📝</Text>
);

const DeleteIcon = () => (
  <Text style={iconStyles.deleteIcon}>×</Text>
);

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <View style={styles.container} testID="task-item">
      <View style={styles.taskContent}>
        <TaskIcon />
        <Text style={styles.description} testID="task-description">
          {task.description}
        </Text>
      </View>
      {onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(task.id)}
          testID="delete-button"
        >
          <DeleteIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Icon styles
const iconStyles = StyleSheet.create({
  taskIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  deleteIcon: {
    fontSize: 22,
    color: '#dc2626',
    fontWeight: 'bold',
    lineHeight: 22,
  },
});

// Main styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fef2f2',
    marginLeft: 8,
  },
});