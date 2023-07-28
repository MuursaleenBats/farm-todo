import React from 'react'
import {Switch, useColorMode, FormLabel} from '@chakra-ui/react'
export const ThemeToggler = ({showLabel = false, ...rest}) => {

    const {toggleColorMode, colorMode} = useColorMode()
  return (
    <>
        {
            showLabel &&
            (
                <FormLabel htmlFor='theme-toggler' mb={0}>
                    Enable dark theme
                </FormLabel>
            )
        }
        <Switch 
            id = "theme-toggler"
            size = "sm"
            isChecked = {colorMode === "dark"}
            value={colorMode}
            colorScheme='green'
            mr = {2}
            onChange = {toggleColorMode}
            {... rest}
        />
    </>
  )
}
