import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import AvatarComponent from "../AvatarComponent";
import CallStatus from "../CallStatus";
import CallEstimate from "../CallEstimate";
import AudioPlayer from "../AudioPlayer";
import { format } from "libphonenumber-js";
import { DateTime } from "luxon";

function secondsToMinutes(time: number) {
  return Math.floor(time / 60) + ":" + Math.floor(time % 60);
}

const CallItem = ({ row }: any) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.type}>
      <TableCell align="left" className="blank"></TableCell>
      <TableCell align="left">
        <CallStatus
          direction={row.in_out}
          status={row.status === "Дозвонился"}
        />
      </TableCell>
      <TableCell align="left">
        {DateTime.fromJSDate(new Date(row.date)).toFormat("hh:mm")}
      </TableCell>
      <TableCell align="left">
        <AvatarComponent avatar={row.person_avatar} />
      </TableCell>
      <TableCell align="left">
        {format(row.partner_data.phone, "RU", "INTERNATIONAL")}
      </TableCell>
      <TableCell align="left" className="source-name">
        <Box sx={{ paddingRight: "10px" }}>{row.partner_data.name}</Box>
      </TableCell>
      <TableCell align="left">
        <CallEstimate />
      </TableCell>
      <TableCell align="right">
        {row.record ? (
          <>
            <Box className="player-wrapper">
              <AudioPlayer
                recordId={row.record}
                partnerId={row.partner_data.id}
                currentRecordId={row.id}
              />
            </Box>
            <Box className="time-wrapper">{secondsToMinutes(row.time)}</Box>
          </>
        ) : (
          <Box className="">{secondsToMinutes(row.time)}</Box>
        )}
      </TableCell>
      <TableCell align="left"></TableCell>
    </TableRow>
  );
};

export default CallItem;
