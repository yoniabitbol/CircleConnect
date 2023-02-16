import { TextField, Autocomplete, Box, Avatar} from "@mui/material";
// import {InputAdornment} from "@mui/material";
import { Link } from "react-router-dom";
import {  Search, } from "@mui/icons-material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {CircularProgress} from "@mui/material";
import UserInSearch from "../../Models/UsersInSearchModel";
import React from "react";


const searchBoxes = (props: any, option :any) => (
  <Link  to={`user/${option.id}`} className="hover:bg-red-600">
    <div className="highlighted:bg-red-600">
      <Box component='li' sx={{border: 1, borderColor: '#D4D4D4', marginBottom: 1, width: 1, borderRadius:2, '&:hover':{boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)" }}}  {...props}>
      <div className=" items-center flex" >
        <Avatar src={option.avatar}/>
        <div className="flex-col min-w-fit">
          <div className="ml-2 font-sans text-sm ">
            {option.name}
          </div>
          <div className="ml-2 font-light text-sm">
            {option.position}
          </div>
        </div>
      </div>
      <div className="ml-10 text-[10px]">
        <ArrowForwardIosIcon fontSize='inherit' sx={{color:'#D4D4D4'}}/>
      </div>
    </Box>
    </div>
  </Link>
  
  )
const SearchBar: React.FC<{searchResults: UserInSearch[], inputChangeHandler: (value: string) => void}> = (props) => {
  const {searchResults, inputChangeHandler} = props;
  const loading = searchResults.length === 0;
  const [value, setValue] = React.useState<string>('');
  const OnChangeHandler = (_:any, value : string) => {
    setValue(value);
    inputChangeHandler(value);
  }
  return (
      <Autocomplete
        open={value.length > 0}
        inputValue={value}
        onInputChange={OnChangeHandler}
        clearIcon={<Search/>}
        noOptionsText={"No results found"}
        sx={{  height: '100%'}}
        options={searchResults}
        groupBy={(option) => option.type}
        renderGroup={(params) => (
          <Box sx={{ p: 0.5 }} {...params}>
            <div className="ml-4 text-xs font-sans text-gray-400"> {params.group} </div>
            <div className="p-4">
              {params.children}
            </div>
      
          </Box>
        )}
        renderOption={searchBoxes}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ height: '100%'}}
            fullWidth={true}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <div className="flex items-center">
                  <Search sx={{color:'#4B47B7'}}/>
                </div>
              ),
              endAdornment: loading ? <CircularProgress color="inherit" size={20} sx={{position:'absolute', right:6}} /> : null,
          
            }}
          />
        )}
      />
  );
};


export default SearchBar;