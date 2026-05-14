import { Box, Text } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

import { Layout } from "@/components/Layout/Layout";

import {
  containerStyles,
  descriptionStyles,
  titleStyles,
} from "./styles";

export function Home() {
  const { t } = useTranslation("home");

  return (
    <Layout>
      <Box {...containerStyles}>
        <Text {...titleStyles}>{t("title")}</Text>

        <Text {...descriptionStyles}>{t("description")}</Text>
      </Box>
    </Layout>
  );
}