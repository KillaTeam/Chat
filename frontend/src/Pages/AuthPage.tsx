import React, { FC } from "react";
import {
  ChakraProvider,
  Box,
  Grid,
  Container,
  Input,
  InputLeftAddon,
  InputGroup,
  FormControl,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../Themes/ColorModeSwitcher";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Palete from "../Themes/Palete";
import {theme} from "../Themes/theme";
import Registration from "../Components/Registration";
import Login from "../Components/Login";

export const AuthPage: FC = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />

        <Container>
          <Box border={`3px solid`} padding={"10px"} borderRadius={20}>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Registration</Tab>
                <Tab>Login</Tab>
              </TabList>
              <TabPanels>
                <Registration />
                <TabPanel>
                  <Login />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Grid>
    </Box>
  </ChakraProvider>
);
