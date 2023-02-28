import * as React from 'react';
import {Button, Menu, MenuItem} from '@mui/material';;
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {UploadFile, FileCopy} from '@mui/icons-material';


export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                sx={{backgroundColor:'#4D47C3', ':hover':{backgroundColor:'#4D47C3'},  '&:hover':{transitionProperty:'transform', transitionDuration:'0.3s', transform:'scale(1.02)',  filter: 'drop-shadow(0px 0px 2px #6947C3)'}}}
                variant="contained"
                component='label'
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}>
                Apply
            </Button>
            <Menu
                id="demo-customized-menu"
                MenuListProps={{'aria-labelledby': 'demo-customized-button',}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} disableRipple>
                    <Button component='label' variant='text' sx={{color:'black'}}>
                        <UploadFile />
                        Upload New CV
                        <input hidden type="file"/>
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <Button variant='text' sx={{color:'black'}}>
                        <FileCopy />
                        Apply With Existing Resume
                    </Button>
                </MenuItem>
            </Menu>
        </div>
    );
}