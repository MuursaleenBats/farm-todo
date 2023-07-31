import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import {useForm, Controller} from 'react-hook-form'
import axiosInstance from "../../services/axios";

export const AddUpdateTodoModal = ({
  editable = false,
  defaultValues = {},
  onSuccess = () => {},
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { todoId } = useParams();
  const {handleSubmit, register, control, formState:{
    errors, isSubmitting
  }} = useForm(
    {
        defaultValues: {...defaultValues}
    }
  )

  const onSubmit = async (value) => {
    try {
      if(editable){
        await axiosInstance.put(`/todo/${todoId}`, value);
      }else{
        await axiosInstance.post('/todo/create', value);
      }
      toast({
        title: editable ? "Todo Updated" : "Todo Added",
        status: "success",
        isClosable: true,
        duration: 1500
      })
      onSuccess();
      onClose();
    } catch (error) {
        console.error(error);
        toast({
          title: "Something went wrong. Try again",
          status: "error",
          isClosable: true,
          duration: 1500
        })
    }
  }
  return (
    <Box {...rest}>
      <Button colorScheme="green" w="100%" onClick={onOpen}>
        {editable ? "UPDATE TODO" : "ADD TODO"}
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={"xl"}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>{editable ? "UPDATE TODO" : "ADD TODO"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl isInvalid={errors.title}>
                    <Input
                        placeholder="Todo Title.."
                        background={useColorModeValue("gray.300", "gray.600")}
                        type="text"
                        variant="filled"
                        size="lg"
                        mt={6}
                        {...register("title", {
                            required: "This is required field",
                            minLength: {
                                value: 5,
                                message: "Title must be atleast 5 characters long"
                            },
                            maxLength: {
                                value: 55,
                                message: "Title can be atmost 55 characters"
                            }
                        })}
                    />
                    <FormErrorMessage>
                        {errors.title && errors.title.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description}>
                    <Textarea
                        row={5}
                        placeholder="Add Description..."
                        background={useColorModeValue("gray.300", "gray.600")}
                        type="text"
                        variant="filled"
                        size="lg"
                        mt={6}
                        {...register("description", {
                            required: "This is required field",
                            minLength: {
                                value: 5,
                                message: "Description must be atleast 5 characters long"
                            },
                            maxLength: {
                                value: 200,
                                message: "Description can be atmost 200 characters"
                            }
                        })}
                    />
                    <FormErrorMessage>
                        {errors.description && errors.description.message}
                    </FormErrorMessage>
                </FormControl>
                <Controller 
                  control={control}
                  name="status"
                  render={({field}) => (
                    <FormControl mt={6} display={"flex"} alignItems={'center'}>
                      <FormLabel htmlFor='is-done'>
                        Status
                      </FormLabel>
                      <Switch
                        id = "is-done"
                        size = "md"
                        onChange = {(e) => {field.onChange(e.target.checked)}}
                        isChecked = {field.value}
                        name="status"
                        isDisabled={false}
                        isLoading = {false}
                        colorScheme="green"
                        variant='ghost'
                      />
                    </FormControl>
                  )}
                />
            </ModalBody>
            <ModalFooter>
              <Stack direction={"row"} spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting}>
                    Close
                </Button>
                <Button 
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText={editable?"updating":"Creating"}
                >
                  {editable ? "Update" : "Create"}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
