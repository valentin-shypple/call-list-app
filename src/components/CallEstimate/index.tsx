import Box from "@mui/material/Box";
import { Estimates } from "../../constants";

interface IProps {
  id: number;
}

const CallEstimate = ({ id }: IProps) => {
  const result = id % 150;
  console.log(result);
  let random = Estimates[0];

  if (result < 30) {
    random = Estimates[1];
  }
  if (30 < result && result < 100) {
    random = Estimates[2];
  }
  if (result > 100) {
    random = Estimates[3];
  }

  return random.value ? (
    <Box
      sx={{
        display: "inline-block",
        fontSize: "14px",
        color: random.text,
        border: `1px solid ${random.color}`,
        borderRadius: "4px",
        padding: "2px 8px",
        background: random.fill,
      }}
    >
      {random.value}
    </Box>
  ) : (
    <></>
  );
};

export default CallEstimate;
