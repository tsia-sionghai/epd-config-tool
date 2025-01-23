declare const colors: {
    readonly lightBlue60: "#F4F6F9";
    readonly lightBlue: "#EDF0F5";
    readonly purple20: "#E5E5EC";
    readonly purple30: "#D9D7E2";
    readonly brightPurple: "#827BB5";
    readonly primaryPurple: "#7F7B9F";
    readonly white: "#FFFFFF";
    readonly lightGray: "#DEDEDE";
    readonly darkGray: "#A2ABB3";
    readonly black: "#312F3F";
    readonly red20: "#FDD7D7";
    readonly red: "#F33737";
    readonly darkRed: "#B81414";
    readonly orange: "#F9A965";
    readonly darkGreen: "#297D3D";
};
declare const theme: import("@mui/material/styles").Theme;
declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        basic: true;
    }
}
export { colors };
export default theme;
