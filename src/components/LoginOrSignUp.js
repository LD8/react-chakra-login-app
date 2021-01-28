import React, { useState } from 'react'
import {
  Button,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  InputLeftElement,
  Text,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import LoginExtra from './LoginExtra'
import { FaUser, FaLock, FaAt } from 'react-icons/fa'
import { login, register as signUp } from '../api'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

export default function LoginOrSignUp({ isLogin = false }) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const schema = yup.object({
    username: isLogin ? yup.string().min(6).max(15) : yup.string().min(6).max(15).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(50).required(),
  })

  const { handleSubmit, errors, register, formState } = useForm({
    resolver: yupResolver(schema),
  })
  const toast = useToast()
  const onSubmit = async (values) => {
    try {
      const { data } = isLogin ? await login(values) : await signUp(values)
      if (data.user && data.user.token) {
        toast({
          position: 'top',
          description: `${isLogin ? 'Login' : 'Sign up'} successfully: ${data.user.username.toUpperCase()}`,
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
        setTimeout(() => {
          window.open('https://donlee.online', '_blank').focus()
        }, 2500)
      }
    } catch (error) {
      const errors = error.response.data.errors
      Object.keys(errors).forEach((key) => {
        errors[key].forEach((e) => {
          toast({
            position: 'top',
            description: `${key} ${e}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        })
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} mt={4}>
        {!isLogin && (
          <VStack w="full">
            <FormControl isInvalid={errors.username}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUser color="gray.700" />} />
                <Input placeholder="Please enter username" name="username" ref={register} />
              </InputGroup>
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        )}

        <VStack w="full">
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaAt color="gray.700" />} />
              <Input type="email" placeholder="Please enter your email" name="email" ref={register} />
            </InputGroup>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
        </VStack>

        <VStack w="full">
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock color="gray.700" />} />
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Please enter password"
                name="password"
                ref={register}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </VStack>

        {isLogin && (
          <Checkbox colorScheme="teal" w="full" pl="3">
            <Text ml="1">Remember me</Text>
          </Checkbox>
        )}

        <Button w="100%" colorScheme="teal" type="submit" isLoading={formState.isSubmitting}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>

        <LoginExtra />
      </VStack>
    </form>
  )
}
