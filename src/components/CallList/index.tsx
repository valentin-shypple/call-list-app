import { useContext, useState, useEffect } from "react";
import { useDeepCompareEffect } from "use-deep-compare";
import { observer } from "mobx-react";
import { AppStoreContext } from "../../store";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CallItem from "../CallItem";
import { Columns, SortFilterValue } from "../../constants";
import { fetchCallList } from "../../endpoints";
import "./CallList.css";

const CallList = observer(() => {
  const store = useContext(AppStoreContext);
  const [callsList, setCallsList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetchCallList(
        "2025-01-01",
        "2025-02-01",
        store.filters.inOut,
        store.filters.sortBy,
        store.filters.order
      );
      const calls = response.data.results;

      setCallsList(calls);
    };

    fetchList();
  }, []);

  const clickOnSort = (type: SortFilterValue) => {
    console.log("type", type);
    store.setSortBy(type);
    store.setOrder(
      !store.filters.order || store.filters.order === "ASC" ? "DESC" : "ASC"
    );
  };

  return (
    <Paper id="table-wrapper">
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    cursor: !!column.sortValue ? "pointer" : "default",
                  }}
                  className={column.className}
                  onClick={() => {
                    if (!column.sortValue) return;
                    clickOnSort(column.sortValue);
                  }}
                >
                  {column.sortValue ? (
                    <Box
                      className={
                        column.sortValue === "date"
                          ? "header-arrow"
                          : "header-arrow-end"
                      }
                    >
                      {store.filters.order === "ASC" ? (
                        <ExpandMoreIcon />
                      ) : (
                        <ExpandLessIcon />
                      )}
                    </Box>
                  ) : null}
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                style={{ minWidth: "30px", cursor: "pointer", zIndex: 1 }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {callsList.map((row: any) => {
              return <CallItem row={row} key={row.id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});

export default CallList;
