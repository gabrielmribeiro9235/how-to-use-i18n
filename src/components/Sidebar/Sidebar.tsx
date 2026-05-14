import { Box, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  linkStyles,
  navContainerStyles,
  nestedContainerStyles,
  sectionTitleStyles,
  sidebarStyles,
} from "./styles";

export function Sidebar() {
  const { t } = useTranslation("common");

  return (
    <Box {...sidebarStyles}>
      <Box {...navContainerStyles}>
        <Link to="/home">
          <Box {...linkStyles}>{t("home")}</Box>
        </Link>

        <Text {...sectionTitleStyles}>{t("section1")}</Text>

        <Box {...nestedContainerStyles}>
          <Link to="/section1/pageA">
            <Box {...linkStyles}>{t("pageA")}</Box>
          </Link>

          <Link to="/section1/pageB">
            <Box {...linkStyles}>{t("pageB")}</Box>
          </Link>
        </Box>

        <Text {...sectionTitleStyles}>{t("section2")}</Text>

        <Box {...nestedContainerStyles}>
          <Link to="/section2/pageA">
            <Box {...linkStyles}>{t("pageA")}</Box>
          </Link>

          <Link to="/section2/pageB">
            <Box {...linkStyles}>{t("pageB")}</Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}