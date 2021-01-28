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
  chakra,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import LoginExtra from './LoginExtra'
import { FaUser, FaLock, FaAt } from 'react-icons/fa'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
import { login, register as signUp } from '../api'
import { useForm } from 'react-hook-form'

export default function LoginOrSignUp({ isLogin = false }) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  // const { handleSubmit, getFieldProps, touched, errors } = useFormik({
  //   initialValues: {
  //     username: '',
  //     email: '',
  //     password: '',
  //   },
  //   validationSchema: Yup.object({
  //     username: Yup.string().min(6).max(15).required(),
  //     email: Yup.string().email(),
  //     password: Yup.string().min(6).max(50).required(),
  //   }),
  //   onSubmit: async (values) => {
  //     if (isLogin) {
  //       const { data } = await login(values)
  //       console.log('login res ', data)
  //     } else {
  //       const { data } = await register(values)
  //       console.log('register res ', data)
  //     }
  //   },
  // })
  const FullVStack = chakra(VStack, { baseStyle: { w: 'full' } })

  const { handleSubmit, errors, register, formState } = useForm()

  function valiUsername(value) {
    if (!value) {
      return 'Name is required'
    } else return true
  }

  const onSubmit = async (values) => {
    if (isLogin) {
      const { data } = await login(values)
      console.log('login res ', data)
    } else {
      const { data } = await signUp(values)
      console.log('signUp res ', data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} mt={4}>
        {!isLogin && (
          <FullVStack>
            <FormControl isInvalid={errors.username}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUser color="gray.700" />} />
                <Input placeholder="Please enter username" name="username" ref={register({ validate: valiUsername })} />
              </InputGroup>
              <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
            </FormControl>
          </FullVStack>
        )}

        <FullVStack>
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaAt color="gray.700" />} />
              <Input
                as="input"
                placeholder="Please enter your email"
                type="email"
                name="email"
                ref={register({ validate: valiUsername })}
              />
            </InputGroup>
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
        </FullVStack>

        <FullVStack>
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaLock color="gray.700" />} />
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Please enter password"
                name="password"
                ref={register({ validate: valiUsername })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
        </FullVStack>

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
