import React from 'react'
import {Button, Flex, FormControl, FormErrorMessage, Heading, Input, useColorModeValue, useToast} from '@chakra-ui/react'
import {useForm} from 'react-hook-form' //useForm for validating all the input fields and give proper validation error
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggler } from '../Themes/ThemeToggler';
import axiosInstance from '../../services/axios';

function Register() {
    const {
        handleSubmit,
        register, // handles all the changes to our form
        formState: {errors, isSubmitting}
    } = useForm();

    const navigate = useNavigate()

    const toast = useToast();
    const location = useLocation();

    const onSubmit = async (values) => {
        try {
           await axiosInstance.post('/user/create', values);
            toast({
                title: "User Registered",
                status: 'success',
                duration: 1500
            })
            navigate('/login', {replace: true});
           
        } catch (error) {
            toast({
                title: `${error.response.data.detail}`,
                duration: 1500,
                isClosable: true,
                status: "error"
            })
        }
    }
  return (
    <Flex height="100vh" align="center" justifyContent="center">
        <Flex 
            direction='column'
            alignItems='center'
            background={useColorModeValue('gray.100','gray.700')}
            p={12}
            rounded={6}
        >
            <Heading mb={6}>Register</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid = {errors.email}>
                    <Input 
                        placeholder = "Email"
                        background={useColorModeValue('gray.300','gray.600')}
                        type = "email"
                        size = "lg"
                        mt = {6}
                        {...register("email", {
                            required: "This is required field"
                        })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid = {errors.username}>
                    <Input 
                        placeholder = "Username"
                        background={useColorModeValue('gray.300','gray.600')}
                        type = "text"
                        size = "lg"
                        mt = {6}
                        {...register("username", {
                            required: "This is required field",
                            minLength: {
                                value: 5,
                                message: "Username must be atleast 5 characters"
                            },
                            maxLength: {
                                value: 24,
                                message: "Username must be at most 24 characters"
                            }
                        })}
                    />
                    <FormErrorMessage>
                        {errors.username && errors.username.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid = {errors.password}>
                    <Input 
                        placeholder = "Password"
                        background={useColorModeValue('gray.300','gray.600')}
                        type = "password"
                        size = "lg"
                        mt = {6}
                        {...register("password", {
                            required: "This is required field",
                            minLength: {
                                value: 5,
                                message: "Password must be atleast 5 characters long"
                            },
                            maxLength: {
                                value: 24,
                                message: "Password must be at most 24 characters"
                            }
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                <Button 
                    isLoading = {isSubmitting}
                    loadingText = 'Logging In'
                    width='100%'
                    mt = {6}
                    mb = {6}
                    variant={'outline'}
                    colorScheme="green"
                    type = 'submit'
                >
                    Register
                </Button>
            </form>
                <ThemeToggler showLabel = {true}/>
                <Button 
                    onClick={() => navigate("/login", { replace: true })}
                    width='100%'
                    mt = {6}
                    variant={'outline'}
                    colorScheme="green"
                >
                    Login Instead
                </Button>
        </Flex>
    </Flex>
  )
}

export default Register