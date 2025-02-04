import Box from "@mui/material/Box";
import { Estimates } from "../../constants";

const CallEstimate = () => {
  const random = Estimates[(Math.random() * Estimates.length) | 0];

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
