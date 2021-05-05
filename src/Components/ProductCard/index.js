import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardImage from "./CardImage";
import { numberWithCommas } from "../../Utils/utilityFunctions";
import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';

export default function ProductCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <div>
          <CardImage src={props.image === "https://www.ulcdn.net/assets/spree/frontend/icons/loader-f40db8b3a97fef2e139c0fa9b0de17fc.gif" ? "https://i0.wp.com/www.omantripper.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg" : props.image} />
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
              ₹{numberWithCommas(props.price) || numberWithCommas("0")}
            </span>
            <span className={classes.descriptionNote}>
              {" "}
              | EMI @ {numberWithCommas(props.subNote) || "NA"}/Month
            </span>
            <br />
            <Rating name="read-only" value={props.rating/2} readOnly />
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
    width: 300,
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
