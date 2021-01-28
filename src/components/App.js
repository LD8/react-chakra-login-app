import React from 'react'
import LoginOrSignUp from './LoginOrSignUp'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, useColorModeValue, Box } from '@chakra-ui/react'

const App = () => {
  return (
    <Center w="100vw" h="100vh" pb={10}>
      <Box>
        <Box
          mb={50}
          pt={3}
          pb={5}
          w="370px"
          bg={useColorModeValue('gray.50', 'gray.700')}
          borderRadius="lg"
          boxShadow="dark-lg"
        >
          <Tabs isFitted px={2}>
            <TabList>
              <Tab _focus={{}}>Login</Tab>
              <Tab _focus={{}}>Sign Up</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <LoginOrSignUp isLogin />
              </TabPanel>
              <TabPanel>
                <LoginOrSignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Center>
  )
}

export default App
