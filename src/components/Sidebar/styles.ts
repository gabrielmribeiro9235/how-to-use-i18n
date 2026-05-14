export const sidebarStyles = {
  position: "fixed",
  left: 0,
  top: 0,
  w: "260px",
  h: "100vh",
  bg: "gray.800",
  color: "white",
  p: 6,
  borderRightWidth: "1px",
  borderColor: "gray.700",
} as const;

export const navContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
} as const;

export const sectionTitleStyles = {
  mt: 6,
  mb: 2,
  fontWeight: "bold",
  fontSize: "sm",
  color: "gray.300",
} as const;

export const nestedContainerStyles = {
  pl: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
} as const;

export const linkStyles = {
  p: 2,
  borderRadius: "md",
  transition: "0.2s",
  _hover: {
    bg: "gray.700",
  },
} as const;