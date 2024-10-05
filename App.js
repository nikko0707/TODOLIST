import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks((prevTasks) => [...prevTasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    setDeletedTasks((prevDeleted) => [...prevDeleted, tasks[index]]);
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const restoreTask = (index) => {
    const taskToRestore = deletedTasks[index];
    setTasks((prevTasks) => [...prevTasks, taskToRestore]);
    setDeletedTasks((prevDeleted) => prevDeleted.filter((_, i) => i !== index));
  };

  const removeForever = (index) => {
    setDeletedTasks((prevDeleted) => prevDeleted.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      
      <Text style={styles.subHeader}>Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      
      <Text style={styles.subHeader}>Bin</Text>
      <FlatList
        data={deletedTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.deletedTaskContainer}>
            <Text style={styles.deletedTaskText}>{item.text}</Text>
            <View style={styles.binButtons}>
              <TouchableOpacity onPress={() => restoreTask(index)}>
                <Text style={styles.restoreText}>↩️ Restore</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeForever(index)}>
                <Text style={styles.removeForeverText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00796b',
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#004d40',
  },
  input: {
    height: 50,
    borderColor: '#00796b',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#ffffff',
  },
  addButton: {
    backgroundColor: '#00796b',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#004d40',
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 5,
  },
  deletedTaskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#d32f2f',
    borderBottomWidth: 1,
    backgroundColor: '#ffebee',
    borderRadius: 5,
    marginBottom: 5,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deletedTaskText: {
    fontSize: 18,
    color: '#333',
  },
  restoreText: {
    color: '#00796b',
    marginRight: 10,
  },
  binButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeForeverText: {
    color: 'red',
  },
  deleteText: {
    color: 'red',
    fontSize: 20,
  },
});
