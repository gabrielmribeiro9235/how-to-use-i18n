import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

import ReactCountryFlag from "react-country-flag";

import { IoChevronDown } from "react-icons/io5";

import i18n from "@/i18n/config";

import {
  buttonStyles,
  containerStyles,
  dropdownStyles,
  itemStyles,
  labelStyles,
} from "./styles";

const languages = [
  {
    value: "pt",
    label: "PT",
    countryCode: "BR",
  },

  {
    value: "en",
    label: "EN",
    countryCode: "US",
  },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find(
      (language) => language.value === i18n.language
    ) ?? languages[0];

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <Box
      position="relative"
      ref={containerRef}
      {...containerStyles}
    >
      <Button
        onClick={() =>
          setIsOpen((previous) => !previous)
        }
        {...buttonStyles}
      >
        <Flex alignItems="center" gap="0.3rem">
          <ReactCountryFlag
            countryCode={currentLanguage.countryCode}
            svg
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "2px",
            }}
          />

          <Text {...labelStyles}>
            {currentLanguage.label}
          </Text>

          <IoChevronDown size={14} color="#263C56" />
        </Flex>
      </Button>

      {isOpen && (
        <Box {...dropdownStyles}>
          {languages.map((language) => (
            <Flex
              key={language.value}
              onClick={() =>
                handleChangeLanguage(language.value)
              }
              {...itemStyles}
            >
              <ReactCountryFlag
                countryCode={language.countryCode}
                svg
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "2px",
                }}
              />

              <Text fontWeight="600">
                {language.label}
              </Text>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
}