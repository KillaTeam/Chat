import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";
import { ColorModeSwitcher } from "../Themes/ColorModeSwitcher";
import { Search2Icon } from "@chakra-ui/icons";
import { FriendList } from "./FriendList";
import Palete from "./../Themes/Palete";

export function Menu(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };

  return (
    <>
      <Button onClick={() => handleClick()} key={"full"} m={4}>
        {props.btnTitle}
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
        <DrawerOverlay />
        <DrawerContent alignItems={"center"}>
          <DrawerHeader textAlign={"center"}>Friend List</DrawerHeader>
          <DrawerBody
            display={"flex"}
            alignItems={"center"}
            width={"100%"}
            flexDirection={"column"}
          >
            <Box display={"flex"} gap={10} alignItems={"center"} mb={5}>
              <ColorModeSwitcher />
              {props.search ? (
                <Box display={'flex'} gap={10}>
                  <Input
                    display={"flex"}
                    maxWidth={200}
                    placeholder={"Search"}
                    textAlign={"center"}
                  />
                  <IconButton
                    aria-label="Search"
                    size="md"
                    fontSize="lg"
                    variant="ghost"
                    color="current"
                    marginLeft="2"
                    icon={<Search2Icon />}
                  />
                </Box>
              ) : null}
            </Box>

            <FriendList />
          </DrawerBody>
          <Box
            m={0}
            p={0}
            width={"100%"}
            border={`1px ${Palete.text.main} solid`}
          />
          <DrawerCloseButton
            m={0}
            right={0}
            top={0}
            position={"relative"}
            width={"100%"}
            p={10}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}
