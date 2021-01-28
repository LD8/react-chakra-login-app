import React from 'react'
import svgWechat from '../assets/wechat.svg'
import svgQQ from '../assets/tencentqq.svg'
import { Image, Link, HStack, useColorMode, VStack, Button, Divider } from '@chakra-ui/react'

const LoginExtra = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <VStack spacing={6} w="full">
      <Button w="100%" onClick={toggleColorMode}>
        Color Mode {colorMode.toUpperCase()}
      </Button>
      <Divider />
      <HStack spacing={5}>
        <Link
          isExternal
          href="https://open.weixin.qq.com/connect/qrconnect?appid=wxe9199d568fe57fdd&client_id=wxe9199d568fe57fdd&redirect_uri=https%3A%2F%2Fwww.jianshu.com%2Fusers%2Fauth%2Fwechat%2Fcallback&response_type=code&scope=snsapi_login&state=%257B%257D#wechat_redirect"
        >
          <Image
            src={svgWechat}
            filter="invert(60%)"
            style={{ transition: 'all 0.1s ease-in-out' }}
            _hover={{ filter: 'invert(50%)' }}
          />
        </Link>
        <Link
          isExternal
          href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100410602&redirect_uri=https%3A%2F%2Fwww.jianshu.com%2Fusers%2Fauth%2Fqq_connect%2Fcallback&response_type=code&state=%257B%257D"
        >
          <Image
            src={svgQQ}
            filter="invert(60%)"
            style={{ transition: 'all 0.1s ease-in-out' }}
            _hover={{ filter: 'invert(50%)' }}
          />
        </Link>
      </HStack>
    </VStack>
  )
}

export default LoginExtra
