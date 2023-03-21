import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, Menu, IconButton, Toolbar, Box, AppBar } from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavLinkModel from "../../../Models/NavLinkModel";

const MobileNav: React.FC<{links: NavLinkModel[]}> = (props) => {
    const {links} = props;
  const [toggleNav, setToggleNav] =useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
   
  }, );
  const navLinkClass = "items-center flex flex-col text-sm font-normal justify-center leading-normal ";
  const navActiveClass = " text-violet-900 border-b-2 border-violet-900";
  return (
    <Box  sx={[{ flexGrow: 1}]}>
      <AppBar elevation={0} position="static" sx={{backgroundColor:'white'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color:'#4B47B6'}}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <MenuIcon />
            <div className=" md:hidden">
              <Menu elevation={0} sx={{mt:5}} open={toggleNav && windowWidth < 940} anchorOrigin={{vertical:"top", horizontal:"left"}}>
                {links.map((link: NavLinkModel) => (
                  <MenuItem key={link.key} className="mr-10 max-md:mr-5 md:hidden">
                    <NavLink
                      className={({isActive})=> isActive ? navLinkClass + navActiveClass : navLinkClass}
                      to={link.path}>{link.icon}
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </div>
            
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileNav;