import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "white",
        color: "#212634", 
      },
      ".chakra-ui-dark": {
        bg: "#1A202C",
        color: "#4BD1C5",
      },
    },
  },
})
