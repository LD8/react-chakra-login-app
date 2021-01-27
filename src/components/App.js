import React from 'react'
import { Box, useColorMode, Text, Button, chakra } from '@chakra-ui/react'

const CButton = chakra('button', {
  baseStyle: {
    bg: 'red.400',
    px: '2',
    borderRadius: 'lg',
  },
  sizes: {
    sm: { px: '5' },
    md: { px: '8' },
  },
  variants: {
    primary: {
      bg: 'blue.500',
      color: 'white',
    },
    danger: {
      bg: 'red.700',
      color: 'cyan',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
})

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box w="300px" h="300px">
      <Text>Current Color {colorMode}</Text>
      <Button onClick={toggleColorMode}>切换颜色</Button>
      <CButton size="md" variant="primary">
        CButton
      </CButton>
    </Box>
  )
}
