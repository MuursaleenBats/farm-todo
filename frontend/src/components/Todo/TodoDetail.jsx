import {useEffect, useState, useRef} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axiosInstance from '../../services/axios';
import { Button, Center, Container, Flex, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
export const TodoDetail = () => {
    const [todos, setTodos] = useState({});
    const [loading, setLoading] = useState(true);
    const {todoId} = useParams();
    const isMounted = useRef(false);
    const navigate = useNavigate();
    const background = useColorModeValue('gray.300', 'gray.700');
    useEffect(() => {
      if(isMounted.current) return
      fetchTodo();
      isMounted.current = true;
    }, [todoId])

    const fetchTodo = () => {
      setLoading(true);
      axiosInstance.get(`/todo/${todoId}`).then((res)=>{
        setTodos(res.data);
      }).catch((error) => {
        console.error(error);
      }).finally(()=>{
        setLoading(false);
      })
    }
  

    if(loading){
      return (
        <Container mt={6}>
          <Center mt={6}>
            <Spinner 
              thickness='4px'
              speed = '0.65s'
              emptyColor='green.200'
              color="green.500"
              size={'xl'}   
            />
          </Center> 
        </Container>
      )
    }

    return(
      <>
        <Container mt={6}>
            <Button colorScheme='gray' onClick={()=> {
              navigate('/', {relative: true});
            }}>
              Back
            </Button>
        </Container>
        <Container
          bg={background}
          my={3} 
          minHeight={'7rem'}
          rounded={'lg'}
          p={3}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
            <Text fontSize={'22'}>
              {todos.title}
            </Text>
            <Text bg = 'gray.500' mt = {2} p={2}rounded={'lg'}>
              {todos.description}
            </Text>
            
        </Container>
      </>
    )
}
