import { useTheme } from '@shared/ThemeContext/ThemeContext';
import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { todolistSelector } from './selector';
import { useGetTodoList } from './slices/todolistSlice';

export default function HomeScreen() {
  const todolist = useSelector(todolistSelector);
  const getTodoListRequest = useGetTodoList();
  const handleGetTodolist = () => {
    getTodoListRequest({ endpoint: 'todolist' });
  };
  return (
    <View>
      <Button title="Get TodoList" onPress={handleGetTodolist} />
      <Text>{JSON.stringify(todolist)}</Text>
    </View>
  );
}
