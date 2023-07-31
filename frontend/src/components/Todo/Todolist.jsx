import { Box, Center, Container, Spinner } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../services/axios';
import { TodoCard } from './TodoCard';

export const Todolist = () => {
    const [todos, setTodos] = useState(false);
    const isMounted = useRef();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(isMounted.current) return;
        fetchTodo();
        isMounted.current = true;
    }, []);

    const fetchTodo = () => {
        setLoading(true);
        axiosInstance.get('/todo').then((res)=>{
            setTodos(res.data)
        }).catch((error) => {
            console.error(error);
        }).finally(() =>{
            setLoading(false);
    })
    };

  return <Container mt = {9}>
        {loading ? (
            <Center mt={6}>
                <Spinner 
                  thickness='4px'
                  speed = '0.65s'
                  emptyColor='green.200'
                  color="green.500"
                  size={'xl'}   
                />
            </Center>
        ):(
            <Box mt={6}>
                {
                    todos?.map((todo) =>(
                        <TodoCard todo={todo} key={todo.id} />
                    ))
                }
            </Box>
        )}
    </Container>;
}
