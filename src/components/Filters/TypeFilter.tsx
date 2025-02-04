import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { observer } from "mobx-react";
import { CallTypes } from "../../constants";
import { AppStoreContext } from "../../store";

const TypeFilter = observer(() => {
  const store = useContext(AppStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedType = () => {
    let selected = CallTypes.find((item) => item.value === store.filters.inOut);
    return selected?.name;
  };

  return (
    <Box>
      <Box
        aria-owns={anchorEl ? "type-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="type-filter"
      >
        {selectedType()}
        {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
      <Menu
        id="type-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ list: "type-menu-list", paper: "type-menu-paper" }}
      >
        {CallTypes.map((item) => {
          return (
            <MenuItem
              key={item.name}
              selected={item.value === store.filters.inOut}
              onClick={() => {
                store.setInOut(item.value);
                handleClose();
              }}
              className="filter-menu-item"
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
});

export default TypeFilter;
