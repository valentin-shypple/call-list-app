import { useState, useEffect } from "react";
import { observer } from "mobx-react";
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
import EmptyState from "./EmptyState";
import { Columns, SortFilterValue } from "../../constants";
import { fetchCallList } from "../../endpoints";
import "./CallList.css";
import { useStore } from "../../root-store-context";

const CallList = observer(() => {
  const [callsList, setCallsList] = useState([]);
  const { filtersStore } = useStore();

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetchCallList(
        filtersStore.dateStart,
        filtersStore.dateEnd,
        filtersStore.inOut,
        filtersStore.sortBy,
        filtersStore.order
      );
      const calls = response.data.results;

      setCallsList(calls);
    };

    fetchList();
  }, [
    filtersStore.dateStart,
    filtersStore.dateEnd,
    filtersStore.inOut,
    filtersStore.sortBy,
    filtersStore.order,
  ]);

  const clickOnSort = (type: SortFilterValue) => {
    filtersStore.setSortBy(type);
    filtersStore.setOrder(
      !filtersStore.order || filtersStore.order === "ASC" ? "DESC" : "ASC"
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
                      {filtersStore.order === "ASC" || !filtersStore.order ? (
                        <ExpandMoreIcon
                          className={
                            column.sortValue === filtersStore.sortBy
                              ? "selected"
                              : ""
                          }
                        />
                      ) : (
                        <ExpandLessIcon
                          className={
                            column.sortValue === filtersStore.sortBy
                              ? "selected"
                              : ""
                          }
                        />
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
      {!callsList.length && <EmptyState />}
    </Paper>
  );
});

export default CallList;
