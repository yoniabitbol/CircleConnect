import { TextField, InputAdornment } from "@mui/material";
import {  Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <TextField className="max-md:hidden"
               id="input-with-icon-textfield"
               InputProps={{
                 startAdornment: (
                   <InputAdornment position="start">
                     <Search sx={{color:"#4B47B6"}}/>
                   </InputAdornment>
                 ),
               }}
               placeholder="Search"
    />
  );
};

export default SearchBar;