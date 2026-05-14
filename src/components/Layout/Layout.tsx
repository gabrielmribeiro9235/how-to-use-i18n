import { Box, Flex } from "@chakra-ui/react";

import { Sidebar } from "@/components/Sidebar/Sidebar";

import { LanguageSelector } from "@/components/LanguageSelector/LanguageSelector";

import {
  containerStyles,
  contentStyles,
  contentWrapperStyles,
  headerStyles,
} from "./styles";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <Flex {...containerStyles}>
      <Sidebar />

      <Box {...contentWrapperStyles}>
        <Box {...headerStyles}>
          <LanguageSelector />
        </Box>

        <Box {...contentStyles}>{children}</Box>
      </Box>
    </Flex>
  );
}