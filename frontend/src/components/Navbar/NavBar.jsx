import { Box, Flex, useColorModeValue, Text, Stack, Button } from '@chakra-ui/react'
import React from 'react'
import { ThemeToggler } from '../Themes/ThemeToggler'
import { useAuth } from '../../hooks/useAuth'
import { Outlet } from 'react-router-dom'

export const NavBar = () => {
    const {logout} = useAuth();
  return (
    <Box minHeight={'100vh'}>
        <Flex 
            as = 'nav'
            alignItems={'center'}
            justifyContent={'space-between'}
            wrap={'wrap'}
            bg={useColorModeValue('green.300', 'green.700')}
            color={'white'}
        >
            <Text as = "h2" fontSize={24} fontWeight={'bold'}>{" "}TODOLIST</Text>
            <Stack direction={'row'} align={'center'} spacing={4}>
                <ThemeToggler size = 'md'/>
                <Button
                mt={1}
                mb={1}
                    onClick={logout}
                    colorScheme='green'
                >Logout</Button>
            </Stack>
        </Flex>
        <Outlet/>
    </Box>
  )
}
