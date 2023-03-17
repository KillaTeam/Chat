import React, { FC } from "react";
import { ChakraProvider, Box, Grid, Container, Text, HStack, Tag } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../Themes/ColorModeSwitcher";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Palete from "../Themes/Palete";
import {theme} from "../Themes/theme";
import Registration from "../Components/Registration";
import Login from "../Components/Login";

const friends = [
  {
    name: "killah",
    email: "nezexmain@gmail.com",
    isActivated: true,
    id: "Killa me pls",
    lastMessage: "Whis is last my message",
    lastTimeMessage: "13.12",
    newMessage: false,
  },
  {
    name: "Ira",
    email: "Ira@gmail.com",
    isActivated: false,
    id: "LoL",
    lastMessage: "Whis is last my message",
    lastTimeMessage: "02.12",
    newMessage: true,
  },
  {
    name: "Zmirro",
    email: "dima@gmail.com",
    isActivated: true,
    id: "sdasdsadassssss",
    lastMessage: "Whis is last my message",
    lastTimeMessage: "23.01",
    newMessage: false,
  },
  {
    name: "Zmirro",
    email: "dima@gmail.com",
    isActivated: true,
    id: "sdasdsadassssss",
    lastMessage: "Whis is last my message",
    lastTimeMessage: "23.01",
    newMessage: true,
  },
  {
    name: "Zmirro",
    email: "dima@gmail.com",
    isActivated: true,
    id: "sdasdsadassssss",
    lastMessage: "Whis is last my message",
    lastTimeMessage: "23.01",
    newMessage: false,
  },
  {
    name: "Zmirro",
    email: "dima@gmail.com",
    isActivated: true,
    id: "sdasdsadassssss",
    lastMessage: "Whis is last my message",
    lastTimeMessage: "23.01",
    newMessage: true,
  },
  {
    name: "Zmirro",
    email: "dima@gmail.com",
    isActivated: true,
    id: "sdasdsadassssss",
    lastMessage: "Whis is last my message",
    lastTimeMessage: "23.01",
    newMessage: true,
  },
  {
    name: "Zmirro",
    email: "dima@gmail.com",
    isActivated: true,
    id: "sdasdsadassssss",
    lastMessage: "Whis is last my message",
    lastTimeMessage: "23.01",
    newMessage: true,
  },
    {
    name: "Zmirro",
    email: "dima@gmail.com",
    isActivated: true,
    id: "sdasdsadassssss",
    lastMessage: "Whis is last my messageWhis is last my message     ",
    lastTimeMessage: "23.01",
    newMessage: true,
  },
  
];
const maxLength = 30;
const Slicer = (message:string) =>{
  if (message.length > maxLength ) {
    return message.slice(0, maxLength)+ '...' ;
  }else return message
}

export const FriendList: FC = () => (

    <Box
          className="scrollOff"
          
          width={'100vw'}
          maxHeight={"100vh"}
          overflowY={"scroll"}
          overflowX={"hidden"}

        >
           
          {friends.map((friend) => (
            <Box
              p={3}
              background={Palete.background[900]}
              flexDirection={"column"}
              display={"flex"}
              cursor={'pointer'}
            >
              <Box
                m={2}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Box>{friend.name}</Box> <Box>{friend.lastTimeMessage}</Box>
              </Box>
              <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Text>{Slicer(friend.lastMessage)}</Text>{" "}
                <Box>
                  {friend.newMessage ? (
                    <HStack spacing={4}>
                      {["sm"].map((size) => (
                        <Tag
                          size={size}
                          key={size}
                          borderRadius="full"
                          variant="solid"
                          colorScheme="green"
                        >
                          New
                        </Tag>
                      ))}
                    </HStack>
                  ) : null}
                </Box>
              </Box>
              <hr />
            </Box>
          ))}
        </Box>

);
