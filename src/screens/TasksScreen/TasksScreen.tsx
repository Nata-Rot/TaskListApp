import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addTask, removeTask } from '../../store/slices/tasksSlice';
import { TaskItem } from '../../components/TaskItem/TaskItem';
import { TaskModal } from '../../components/TaskModal/TaskModal';
import { Task } from '../../types';

const AddIcon = () => (
  <Text style={iconStyles.icon}>+</Text>
);

const EmptyIcon = () => (
  <View style={iconStyles.emptyIcon}>
    <Text style={iconStyles.emptyIconText}>📋</Text>
  </View>
);

export const TasksScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleAddTask = (description: string) => {
    dispatch(addTask(description));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(removeTask(id));
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem task={item} onDelete={handleDeleteTask} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks ({tasks.length})</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          testID="add-task-button"
        >
          <AddIcon />
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <EmptyIcon />
          <Text style={styles.emptyText}>No tasks created</Text>
          <Text style={styles.emptySubtext}>
            Press "Add Task" to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          style={styles.list}
          testID="tasks-list"
        />
      )}

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddTask}
      />
    </View>
  );
};

// Icon styles
const iconStyles = StyleSheet.create({
  icon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyIconText: {
    fontSize: 40,
  },
});

// Main styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfd',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#4A6DA7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#4A6DA7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});