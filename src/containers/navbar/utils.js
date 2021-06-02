import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

export const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1.35,
      left: -1.175,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(0.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1.4)",
      opacity: 0,
    },
  },
}))(Badge);

export function initials(name){
    let initial_name = "";
    let names = name.split(" ");
    names.map((n,index)=>{
        if(index === 0 || index === names.length-1)
            initial_name = `${initial_name}${n[0].toUpperCase()}`
        return true;
    });
    return initial_name;
}