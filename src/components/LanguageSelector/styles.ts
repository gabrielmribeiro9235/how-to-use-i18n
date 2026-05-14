export const containerStyles = {
  width: "90px",
} as const;

export const buttonStyles = {
  width: "100%",

  bg: "white",

  borderWidth: "1px",

  borderColor: "gray.200",

  _hover: {
    bg: "gray.100",
  },

  _active: {
    bg: "gray.200",
  },
} as const;

export const dropdownStyles = {
  position: "absolute",

  top: "110%",

  left: 0,

  width: "100%",

  bg: "white",

  borderWidth: "1px",

  borderColor: "gray.200",

  borderRadius: "md",

  overflow: "hidden",

  boxShadow: "md",

  zIndex: 999,
} as const;

export const itemStyles = {
  alignItems: "center",

  gap: "0.5rem",

  padding: "0.75rem",

  cursor: "pointer",

  transition: "0.2s",

  _hover: {
    bg: "gray.100",
  },
} as const;

export const labelStyles = {
  fontSize: "sm",
  color: "#263C56",
  fontWeight: "700",
} as const;