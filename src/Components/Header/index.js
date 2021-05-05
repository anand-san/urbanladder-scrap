import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CommuteIcon from "@material-ui/icons/Commute";
import FaceIcon from "@material-ui/icons/Face";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
export default function Header(props) {
  const classes = useStyles();
    console.log(props.tabValue)
  return (
    <>
      {/* <Grid container spacing={0}></Grid> */}
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={5} lg={3} className={classes.mainLogo}>
          <img alt="main_logo" src="/logo_main.png" width="200px" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={6} className={classes.searchbar}>
          <TextField fullWidth label="Search" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} className={classes.headerIcons}>
          <CommuteIcon className="headerIcon" />
          <FaceIcon className="headerIcon" />
          <FavoriteBorderIcon className="headerIcon" />
          <AddShoppingCartIcon className="headerIcon" />
        </Grid>
      </Grid>
      <div>
        <Paper>
          <Tabs
            value={props.tabValue}
            onChange={props.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {props.navigationBarData.map((e) => (
              <Tab label={e} />
            ))}
          </Tabs>
        </Paper>
      </div>
      <div className={classes.sectionInfo}>
        <h1>{props.navigationBarData[props.tabValue]}</h1>
        <p>
          Displaying{" "}
          {props.productsData[props.navigationBarData[props.tabValue]].length}{" "}
          products
        </p>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  mainLogo: { display: "flex", justifyContent: "center" },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    margin: "10",
    cursor: "pointer",
  },
  headerIcons: {
    display: "flex",
    justifyContent: "space-around",
    padding: 20,
    margin: "10",
    cursor: "pointer",
  },
  sectionInfo: {
    textAlign: "center",
  },
}));
