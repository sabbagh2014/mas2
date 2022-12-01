import _ from "lodash";
import { colors, createTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiFormControlLabet: {
      root: {
        marginRight: "0 !important",
        padding: "0 !important",
      },
    },

    MuiCheckbox: {
      colorSecondary: {
        "&.Mui-checked": {
          color: "#b03f48",
        },
      },
    },
    MuiFormLabel: {
      root: { color: "#222" },
    },
    MuiList: {
      padding: {
        padding: "10px",
      },
    },
    MuiListSubheader: {
      root: {
        color: "#000000",
        fontSize: "22px !important",
        fontWeight: "600 !important",
        lineHeight: "33px !important",
      },
    },

    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "transparent",
      },
      input: {
        padding: "7px",
      },
    },
    MuiPopover: {
      root: {
        zIndex: 99999,
      },
    },
    MuiListItem: {
      gutters: {
        paddingLeft: 0,
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        right: 0,
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        Width: 450,
        maxWidth: "100%",
      },
      paper: {
        overflowY: "unset",
      },
    },
    MuiInputBase: {
      input: {
        fontSize: 14,
        color: "#222",
      },
    },
  
    MuiBackdrop: {
      root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
    },
    MuiButton: {
      containedSizeLarge: {
        "@media(max-width:767px)": {
          padding: "8px 10px !important",
          fontSize: "10px",
        },
      },
      containedSecondary: {
        background: "linear-gradient(180deg, #c04848 0%, #480048 100%);",
        filter: "drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))",
        borderRadius: "50px",
        color: "#fff",
        fontSize: "14px",
        // lineHeight: " 21px",
        padding: "5px 19px",
        "&:hover": {
          // background:"#fff !important",
          background: "linear-gradient(180deg, #480048 0%, #c04848 100%);",
        },
      },

      containedPrimary: {
        backgroundColor: "#fff",
        filter: "drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))",
        borderRadius: "50px",
        color: "#000",
        fontSize: "15px",
        lineHeight: " 21px",
        padding: "10px 39px",
      },
      contained: {
        borderRadius: "50px",
        color: "#141518",
        fontWeight: 600,
        background: "#fff",
        padding: "5px 19px",
        backgroundColor: "#fff",
        "&:hover": {
          backgroundColor: "#e5e3dd !important",
        },
      },
      outlinedPrimary: {
        borderRadius: "50px",
        color: "#0D8CCD",
        fontWeight: 600,
        padding: "5px 19px",
        border: "2px solid #0D8CCD",
        "&:hover": {
          background:
            "linear-gradient(180deg, #039BE3 0%, #039BE2 0.01%, #3A4B6E 100%), #000000",
          border: "2px solid #0D8CCD",
          color: "#fff",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "0",
      },
    },
    MuiMenu: {
      paper: { top: "47px" },
    },

    MuiTypography: {
      subtitle1: {
        color: "#000",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: " 16px",
      },
    },
  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#FBFBFD",
      dark: "#f3f7f9",
      paper: colors.common.white,
    },
    primary: {
      main: "#898989",
      dark: "#de0d0d",
      light: "#de0d0d",
    },
    secondary: {
      main: "#fff",
    },
    warning: {
      main: "#ffae33",
      dark: "#ffae33",
      light: "#fff1dc",
    },
    success: {
      main: "#54e18c",
      dark: "#54e18c",
      light: "#e2faec",
    },
    error: {
      main: "#ff7d68",
      dark: "#ff7d68",
      light: "#ffe9e6",
    },
    text: {
      primary: "#52565c",
      secondary: "#999999",
    },
    common: {
      black: "#222222",
    },
  },
};

export const CreateTheme = (config = {}) => {
  let theme = createTheme(_.merge({}, baseOptions, themesOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes();
  }

  return theme;
};
