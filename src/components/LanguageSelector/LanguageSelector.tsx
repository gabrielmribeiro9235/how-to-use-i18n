import {
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";

import i18n from "@/i18n/config";

import {
  menuContentStyles,
  menuItemStyles,
  triggerButtonStyles,
} from "./styles";

export function LanguageSelector() {
  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button {...triggerButtonStyles}>🌎 Language</Button>
      </MenuTrigger>

      <MenuContent {...menuContentStyles}>
        <MenuItem
          value="pt"
          {...menuItemStyles}
          onClick={() => handleChangeLanguage("pt")}
        >
          🇧🇷 Português
        </MenuItem>

        <MenuItem
          value="en"
          {...menuItemStyles}
          onClick={() => handleChangeLanguage("en")}
        >
          🇺🇸 English
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}