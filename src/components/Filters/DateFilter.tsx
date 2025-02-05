import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import { useMask } from "@react-input/mask";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { NumericFormat } from "react-number-format";
import { DateFilterItems, DateFilterRanges } from "../../constants";
import { observer } from "mobx-react";
import { useStore } from "../../root-store-context";
import { DateTime } from "luxon";

const DateFilter = observer(() => {
  const { filtersStore } = useStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const inputStart = useMask({
    mask: "__.__.__",
    replacement: { _: /\d/ },
  });

  const inputEnd = useMask({
    mask: "__.__.__",
    replacement: { _: /\d/ },
  });

  useEffect(() => {
    selectDateFilter(filtersStore.dateFilterValue);
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

    filtersStore.setDateFilterValue(range);
    filtersStore.setDateEnd(DateTime.now().toISODate());
    filtersStore.setDateStart(
      DateTime.now()
        .minus({ days: Number(range) })
        .toISODate()
    );
    handleClose();
  };

  const selectPrevDate = () => {
    let current = DateFilterRanges.findIndex(
      (el) => el === Number(filtersStore.dateFilterValue)
    );
    if (!!current) selectDateFilter(DateFilterRanges[current - 1].toString());
  };

  const selectNextDate = () => {
    let current = DateFilterRanges.findIndex(
      (el) => el === Number(filtersStore.dateFilterValue)
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
        classes={{ list: "date-menu-list", paper: "date-menu-paper" }}
      >
        {DateFilterItems.map((item) => {
          return (
            <MenuItem
              key={item.name}
              selected={item.value === filtersStore.dateFilterValue}
              onClick={() => {
                selectDateFilter(item.value);
              }}
              className="date-menu-item"
            >
              {item.name}
            </MenuItem>
          );
        })}
        <Box className="filter-label">Указать даты</Box>
        <Box className="date-picker">
          <Box className="inputs-wrapper">
            <input
              ref={inputStart}
              defaultValue={DateTime.fromJSDate(
                new Date(filtersStore.dateStart)
              ).toFormat("dd.MM.yy")}
              onBlur={(event) => {
                let d = DateTime.fromFormat(event.target.value, "dd.MM.yy");
                if (d.isValid) {
                  filtersStore.setDateStart(d.toISODate());
                  setSelectedName(
                    `${event.target.value} - ${DateTime.fromJSDate(
                      new Date(filtersStore.dateEnd)
                    ).toFormat("dd.MM.yy")}`
                  );
                }
              }}
            />
            -
            <input
              ref={inputEnd}
              defaultValue={DateTime.fromJSDate(
                new Date(filtersStore.dateEnd)
              ).toFormat("dd.MM.yy")}
              onBlur={(event) => {
                let d = DateTime.fromFormat(event.target.value, "dd.MM.yy");
                if (d.isValid) {
                  filtersStore.setDateEnd(d.toISODate());
                  setSelectedName(
                    `${DateTime.fromJSDate(
                      new Date(filtersStore.dateStart)
                    ).toFormat("dd.MM.yy")} - ${event.target.value}`
                  );
                }
              }}
            />
          </Box>
          <CalendarTodayIcon />
        </Box>
      </Menu>
    </Box>
  );
});

export default DateFilter;
