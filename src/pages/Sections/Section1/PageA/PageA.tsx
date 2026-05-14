import { Box, Text } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

import { Layout } from "@/components/Layout/Layout";

import {
  containerStyles,
  descriptionStyles,
  titleStyles,
} from "./styles";

export function Section1PageA() {
  const { t } = useTranslation("sections/section1");

  return (
    <Layout>
      <Box {...containerStyles}>
        <Text {...titleStyles}>{t("pageA.title")}</Text>

        <Text {...descriptionStyles}>
          {t("pageA.description")}
        </Text>
      </Box>
    </Layout>
  );
}