export type Theme = {
  borderRadius: string;
  padding: string;
  palette: {
    primary: {
      default: string;
      highlight: string;
    };
    secondary: {
      default: string;
      highlight: string;
      dark: string;
    };
  };
  typography: {
    fontSize: {
      tableHeader: string;
      tableBody: string;
    };
  };
};

export const theme: Theme = {
  borderRadius: "16px",
  padding: "24px",
  palette: {
    primary: {
      default: "#5C50BB",
      highlight: "#EFEDFD",
    },
    secondary: {
      default: "#E1E1E1",
      highlight: "#F7F7F7",
      dark: "#A8A8A8",
    },
  },
  typography: {
    fontSize: {
      tableHeader: "2em",
      tableBody: "1.6em",
    },
  },
};

export type StyledProps = {
  theme: Theme;
};
