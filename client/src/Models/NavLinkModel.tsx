// import { OverridableComponent } from "@mui/material/OverridableComponent";
// import {  SvgIconTypeMap } from "@mui/material";
interface NavLinkModel {
    key: number
    text: string;
    path: string;
    icon: JSX.Element;
    children?: JSX.Element | JSX.Element[] | null;
    
}

export default NavLinkModel;