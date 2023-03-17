import React, { FC } from "react";
import {
  ChakraProvider,
  Box,
  Grid,
  Container,
  Input,
  Text,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../Themes/ColorModeSwitcher";
import Palete from "../Themes/Palete";
import { theme } from "../Themes/theme";
import { IoIosSend } from "react-icons/io";

const messages = [
  {
    from: "Killah",
    message: "Ja tokyo",
    messageTime: "12:20",
  },
  {
    from: "Zmirro",
    message: "Suka ja Mirro WTF",
    messageTime: "12:30",
  },
  {
    from: "Killah",
    message: "Sorry brother",
    messageTime: "12:41",
  },
  {
    from: "Killah",
    message: "Ща поправим",
    messageTime: "12:45",
  },
  {
    from: "Mirro",
    message: "Thx",
    messageTime: "12:50",
  },
  {
    from: "Killah",
    message: "LOL",
    messageTime: "13:20",
  },
  {
    from: "Killah",
    message: "LOL",
    messageTime: "13:20",
  },
  {
    from: "Killah",
    message: "LOL",
    messageTime: "13:20",
  },
  {
    from: "Killah",
    message: "LOL",
    messageTime: "13:20",
  },
  {
    from: "Killah",
    message: "LOL",
    messageTime: "13:20",
  },
];

export const ChatPage: FC = () => (
  <ChakraProvider theme={theme}>
    <Box
      flex={"1 1 auto"}
      alignItems={"center"}
      flexDirection={"column"}
      overflowY={"scroll"}
      overflowX={"hidden"}
      // minHeight={'100vh'}
      maxHeight={"80vh"}
    >
      {messages.map((message) => (
        <Box
          textAlign={message.from === "Killah" ? "left" : "right"}
          height={100}

        >
          <Box  bg={"gray"}>
          <Box>
            <Text m={4}>{message.from}</Text>
            <Text>{message.messageTime}</Text>
          </Box>
          <Text>{message.message}</Text>
          </Box>
        </Box>
      ))}
    </Box>
    <Box display={"flex"}>
      <Input />
      <IoIosSend cursor={"pointer"} fontSize={42} />
    </Box>
  </ChakraProvider>
);
