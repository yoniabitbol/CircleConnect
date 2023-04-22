import { TextField, Autocomplete, Box } from "@mui/material";
import {  Search, } from "@mui/icons-material";
import {CircularProgress} from "@mui/material";
import UserInSearch from "../../Models/UsersInSearchModel";
import React, {MouseEventHandler, useEffect} from 'react';
import SearchResultsBox from './SearchResultsBox';

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

  return (
      <Autocomplete
        open={searchOpen}
        onFocus={emptySearch}
        inputValue={value}
        fullWidth={true}
        openOnFocus
        clearOnBlur
        onInputChange={OnChangeHandler}
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
          <TextField data-testid="link-click-0"
            {...params}
            onClick={textBoxClickHandler}
            sx={{ height: '100%'}}
            fullWidth={true}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <div className="flex items-center">
                  <Search sx={{color:'primary.main'}}/>
                </div>
              ),
              endAdornment: loading && !value ? <CircularProgress color="inherit" size={20} sx={{position:'absolute', right:6}} /> : null,
          
            }}
          />
        )}></Autocomplete>
  );
};


export default SearchBar;