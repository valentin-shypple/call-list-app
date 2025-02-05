import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
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
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const { filtersStore } = useStore();

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetchCallList(
        filtersStore.dateStart,
        filtersStore.dateEnd,
        filtersStore.inOut,
        filtersStore.sortBy,
        filtersStore.order,
        filtersStore.offset
      );
      const calls = response.data.results;

      setCallsList(calls);
      setTotal(response.data.total_rows);
    };

    fetchList();
  }, [
    filtersStore.dateStart,
    filtersStore.dateEnd,
    filtersStore.inOut,
    filtersStore.sortBy,
    filtersStore.order,
    filtersStore.offset,
  ]);

  useEffect(() => {
    setPage(0);
    filtersStore.setOffset(0);
  }, [filtersStore.dateStart, filtersStore.dateEnd, filtersStore.inOut]);

  const clickOnSort = (type: SortFilterValue) => {
    filtersStore.setSortBy(type);
    filtersStore.setOrder(
      !filtersStore.order || filtersStore.order === "ASC" ? "DESC" : "ASC"
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    filtersStore.setOffset(newPage * 50);
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
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={total}
        rowsPerPage={50}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
});

export default CallList;
