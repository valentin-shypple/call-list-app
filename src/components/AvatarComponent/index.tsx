import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

interface IProps {
  avatar: any;
}

const AvatarComponent = ({ avatar }: IProps) => {
  return (
    <Avatar src={avatar} sx={{ width: "32px", height: "32px" }}>
      <PersonIcon />
    </Avatar>
  );
};

export default AvatarComponent;
