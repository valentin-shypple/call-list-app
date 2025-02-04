import React from "react";
import Box from "@mui/material/Box";
import TypeFilter from "./TypeFilter";
import DateFilter from "./DateFilter";

const Filters = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        height: "60px",
      }}
    >
      <TypeFilter />
      <DateFilter />
    </Box>
  );
};

export default Filters;
