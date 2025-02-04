import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { NumericFormat } from "react-number-format";
import { DateFilterItems, DateFilterRanges } from "../../constants";
import { observer } from "mobx-react";
import { AppStoreContext } from "../../store";
import { DateTime } from "luxon";

const DateFilter = observer(() => {
  const store = useContext(AppStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    selectDateFilter(store.filters.dateFilterValue);
  }, []);

  const handleClick = (event: any) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectDateFilter = (range: string) => {
    let selected = DateFilterItems.find((item) => item.value === range);
    if (selected) setSelectedName(selected.name);

    store.setDateFilterValue(range);
    store.setDateStart(DateTime.now().toISODate());
    store.setDateEnd(
      DateTime.now()
        .minus({ days: Number(range) })
        .toISODate()
    );
    handleClose();
  };

  const selectPrevDate = () => {
    let current = DateFilterRanges.findIndex(
      (el) => el === Number(store.filters.dateFilterValue)
    );
    if (!!current) selectDateFilter(DateFilterRanges[current - 1].toString());
  };

  const selectNextDate = () => {
    let current = DateFilterRanges.findIndex(
      (el) => el === Number(store.filters.dateFilterValue)
    );
    if (current < DateFilterRanges.length - 1)
      selectDateFilter(DateFilterRanges[current + 1].toString());
  };

  return (
    <Box>
      <Box className="date-filter">
        <KeyboardArrowLeftIcon onClick={selectPrevDate} />
        <Box
          aria-owns={anchorEl ? "date-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          className="date-filter-value"
        >
          <CalendarTodayIcon />
          {selectedName}
        </Box>
        <KeyboardArrowRightIcon onClick={selectNextDate} />
      </Box>
      <Menu
        id="date-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ list: "date-menu-list", paper: "date-menu-paper" }}
      >
        {DateFilterItems.map((item) => {
          return (
            <MenuItem
              key={item.name}
              selected={item.value === store.filters.dateFilterValue}
              onClick={() => {
                selectDateFilter(item.value);
              }}
              className="date-menu-item"
            >
              {item.name}
            </MenuItem>
          );
        })}
        {/* <Box className="filter-label">Указать даты</Box>
        <Box className="date-picker">
          <CalendarTodayIcon />
        </Box> */}
      </Menu>
    </Box>
  );
});

export default DateFilter;
