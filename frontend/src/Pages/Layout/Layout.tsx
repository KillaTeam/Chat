import { Box, Button, HStack, IconButton,IconButtonProps, Input, Tag, Text } from "@chakra-ui/react";
import { FC, useState, useEffect, ReactNode } from "react";
import { ColorModeSwitcher } from "../../Themes/ColorModeSwitcher";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../Themes/theme";
import "./Layout.css";
import Palete from "../../Themes/Palete";
import { Outlet } from "react-router-dom";
import { IUser } from "../../Types/UserTypes";
import { FriendList } from "./../../Components/FriendList";
import { Search2Icon } from "@chakra-ui/icons";
import { Menu } from "../../Components/Menu";


const getMode = localStorage.getItem("chakra-ui-color-mode");

export const Layout: FC = () => {
  const [mode, setMode] = useState(getMode);

  // useEffect(() => {
  //   const updateStyles = () => {
  //     const backgroundColor = mode === 'dark' ? Palete.background[900] : Palete.background[200],
  //     document.body.querySelector('.switch') = backgroundColor
  //   }
  //   updateStyles();
  // }, [mode])

  return (
    <ChakraProvider theme={theme}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={'center'} mb={3} mt={1}>

        <Menu btnTitle={'Friend List'} search={true}/>

        <Button color={"red.500"}>Log Out</Button>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        overflow={"hidden"}
        border={`2px ${Palete.background[700]} solid`}
        borderRadius={10}
        m={"0 auto"}
      >

        <Box
          flex={3}
          display={"flex"}
          minHeight={"100%"}
          flexDirection={"column"}
        >
          <Outlet />
        </Box>
      </Box>
      {/* <hr color={"#333333"} /> */}
    </ChakraProvider>
  );
};
