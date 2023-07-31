import { Flex, useColorModeValue, Text, Badge } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export const TodoCard = ({todo}) => {
  const navigate = useNavigate()
  return (
    <Flex 
      bg={useColorModeValue('gray.300', 'gray.700')}
      my={3} 
      minHeight={'3rem'}
      rounded={'lg'}
      p={3}
      alignItems={'center'}
      _hover={{
        opacity: 0.9,
        cursor: 'pointer',
        transform: 'translateY(-3px)'
      }}
      justifyContent={'space-between'}
      onClick={() => navigate(`/${todo.todo_id}`)}
    >
      <Text>{todo.title}</Text>
      <Badge colorScheme={todo.status ? 'green' : 'purple'}>
        {todo.status ? "complete" : "pending"}
      </Badge>
    </Flex>
  )
}
