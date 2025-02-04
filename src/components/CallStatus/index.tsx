import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

interface IProps {
  direction: number | null;
  status: boolean;
}

function isNumber(n: number | null) {
  return typeof n == "number" && !isNaN(n);
}

const CallStatus = ({ direction, status }: IProps) => {
  if (!isNumber) return <></>;

  return (
    <>
      {direction ? (
        <CallMadeIcon
          id="call-made"
          className={status ? "green-call" : "red-call"}
        />
      ) : (
        <CallReceivedIcon
          id="call-receive"
          className={status ? "blue-call" : "red-call"}
        />
      )}
    </>
  );
};

export default CallStatus;
