import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardImage from "./CardImage";
import { numberWithCommas } from "../../Utils/utilityFunctions";
import Button from "@material-ui/core/Button";

export default function ProductCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <div>
          <CardImage src={props.image} />
        </div>
        <div className={classes.infoSection}>
          <span className={classes.cardDescription}>
            <span className={classes.descriptionTitle}>
              {props.title || "Title"}
            </span>
            <span className={classes.descriptionSubTitle}>
              ({props.subTitle || "Sub Title"})
            </span>
            <span className={classes.descriptionPrice}>
              ₹{numberWithCommas(props.price) || numberWithCommas("5000")}
            </span>
            <span className={classes.descriptionNote}>
              {" "}
              | EMI @ {props.subNote || "1234"}
            </span>
          </span>
          <br />
          <span>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              style={{ marginBottom: 3 }}
            >
              Add to compare
            </Button>
            <Button variant="contained" color="secondary" fullWidth>
              View All Options
            </Button>
          </span>
        </div>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  paper: {
    width: 275,
    height: "auto",
  },
  cardDescription: {
    textAlign: "center",
    display: "block",
  },
  descriptionTitle: {
    display: "block",
  },
  descriptionSubTitle: {
    display: "block",
    color: "#888",
    fontSize: 10,
  },
  descriptionNote: {
    color: "#888",
  },
  infoSection: {
    padding: 5,
  },
}));
