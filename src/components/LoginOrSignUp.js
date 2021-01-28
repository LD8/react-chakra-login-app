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
} from '@chakra-ui/react'
import LoginExtra from './LoginExtra'
import { FaUser, FaLock, FaAt } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { login, register } from '../api'

export default function LoginOrSignUp({ isLogin = false }) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(6).max(15).required(),
      email: Yup.string().email(),
      password: Yup.string().min(6).max(50).required(),
    }),
    onSubmit: async (values) => {
      if (isLogin) {
        const { data } = await login(values)
        console.log('login res ', data)
      } else {
        const { data } = await register(values)
        console.log('register res ', data)
      }
    },
  })
  const FullVStack = chakra(VStack, { baseStyle: { w: 'full' } })
  console.log(getFieldProps)
  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6} mt={4}>
        {!isLogin && (
          <FullVStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaUser color="gray.700" />} />
              <Input placeholder="Please enter username" {...getFieldProps('username')} />
            </InputGroup>
            {touched.username && errors.username ? <Text color="red.400">{errors.username}</Text> : null}
          </FullVStack>
        )}

        <FullVStack>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaAt color="gray.700" />} />
            <Input as='input' placeholder="Please enter your email" type="email" {...getFieldProps('email')} />
          </InputGroup>
          {touched.email && errors.email ? <Text color="red.400">{errors.email}</Text> : null}
        </FullVStack>

        <FullVStack>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaLock color="gray.700" />} />
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Please enter password"
              {...getFieldProps('password')}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {touched.password && errors.password ? <Text color="red.400">{errors.password}</Text> : null}
        </FullVStack>

        {isLogin && (
          <Checkbox colorScheme="teal" w="full" pl="3">
            <Text ml="1">Remember me</Text>
          </Checkbox>
        )}

        <Button w="100%" colorScheme="teal" type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>

        <LoginExtra />
      </VStack>
    </form>
  )
}
