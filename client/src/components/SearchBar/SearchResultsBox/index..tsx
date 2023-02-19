import { Avatar, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
const SearchResultsBox = (props: any, option: any ) => {
  
  return (
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
  );
};

export default SearchResultsBox;