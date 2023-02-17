import { TextField, Autocomplete, Box, Avatar } from "@mui/material";
// import {InputAdornment} from "@mui/material";
import {  Search, } from "@mui/icons-material";
import {CircularProgress} from "@mui/material";
import UserInSearch from "../../Models/UsersInSearchModel";
import React, { MouseEventHandler, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const SearchBar: React.FC<{searchResults: UserInSearch[], inputChangeHandler: (value: string) => void, loading:boolean, searchOpen: boolean, outsideClicked: MouseEventHandler}> = (props) => {
  const {searchResults, inputChangeHandler, loading, searchOpen} = props;
  const [value, setValue] = React.useState<string>('');
  const [results, setResults] = React.useState<UserInSearch[]>([]);
  const emptySearch = () => {
    setValue('');
    inputChangeHandler('');
  }
  useEffect(() => {
    if(!searchOpen) {
        setResults([])
        setValue('')
    }
  }, [searchOpen])
  const OnChangeHandler = (_:any, value : string) => {
    setValue(value);
    // inputChangeHandler(value);
    if(value.length > 0){
      setResults(searchResults);
    }else{
      setResults([]);
    }
  }
  
  const textBoxClickHandler = () => {
    setResults([])
    setValue('')
  }
  
  
  
  const SearchResultsBox = (props: any, option: any ) => {
    return (
      <Link  to={`user/${option.id}`} onClick={textBoxClickHandler}>
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
    );
  };
  return (
      <Autocomplete
        open={searchOpen}
        onFocus={emptySearch}
        inputValue={value}
        onInputChange={OnChangeHandler}
        clearIcon={<Search/>}
        openOnFocus={false}
        noOptionsText={"No results found"}
        sx={{  height: '100%'}}
        options={results}
        groupBy={(option) => option.type}
        renderGroup={(params) => (
          <Box sx={{ p: 0.5 }} {...params}>
            <div className="ml-4 text-xs font-sans text-gray-400"> {params.group} </div>
            <div className="p-4">
              {params.children}
            </div>
      
          </Box>
        )}
        renderOption={SearchResultsBox}
        renderInput={(params) => (
          <TextField
            {...params}
            onClick={textBoxClickHandler}
            sx={{ height: '100%'}}
            fullWidth={true}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <div className="flex items-center">
                  <Search sx={{color:'#4B47B7'}}/>
                </div>
              ),
              endAdornment: loading && !value ? <CircularProgress color="inherit" size={20} sx={{position:'absolute', right:6}} /> : null,
          
            }}
          />
        )}
      />
  );
};


export default SearchBar;