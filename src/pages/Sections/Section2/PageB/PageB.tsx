import { Box, Text } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

import { Layout } from "@/components/Layout/Layout";

import {
  containerStyles,
  descriptionStyles,
  titleStyles,
} from "./styles";

export function Section2PageB() {
  const { t } = useTranslation("sections/section2");

  return (
    <Layout>
      <Box {...containerStyles}>
        <Text {...titleStyles}>{t("pageB.title")}</Text>

        <Text {...descriptionStyles}>
          {t("pageB.description")}
        </Text>
      </Box>
    </Layout>
  );
}