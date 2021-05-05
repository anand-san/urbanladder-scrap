import ProductCard from "./Components/ProductCard";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CustomAd from "./Components/CustomAd";
import Container from "@material-ui/core/Container";
import Header from "./Components/Header";
import { FetchData } from "./data-access/request-layer";
import L_Loader from "./Components/Loader";
import InlineError from "./Components/InlineErrorBoundary";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [navigationBarData, setNavigationBarData] = React.useState([]);
  const [productsData, setProductsData] = React.useState();
  const [currentViewItems, setCurrentViewItems] = React.useState([]);
  const [tabValue, setTabValue] = React.useState(0);
  const [componentDataLoading, setComponentDataLoading] = React.useState(false)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setComponentDataLoading(true)
    setTimeout(() => {
      setCurrentViewItems(productsData[navigationBarData[newValue]])
      setComponentDataLoading(false)
    }, 1000)
  };

  React.useEffect(() => {
    FetchData()
      .then((data) => {
        let types = Object.keys(data)
        setNavigationBarData(types);
        setProductsData(data);
        setCurrentViewItems(data[types[tabValue]])
      })
      .catch((e) => setIsError(e.message || e))
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, setCurrentViewItems, setProductsData, setNavigationBarData]);

  if (isLoading) return <L_Loader />;

  if (isError) return <InlineError error={isError} />;

  return (
    <Container maxWidth="lg">
      <Header
        navigationBarData={navigationBarData}
        productsData={productsData}
        currentViewItems={currentViewItems}
        setCurrentViewItems={setCurrentViewItems}
        tabValue={tabValue}
        setTabValue={setTabValue}
        handleTabChange={handleTabChange}
      />
      <div className="fadeInUp">
        <CustomAd
          image="https://www.ulcdn.net/media/collections/listing/Safe_Delivery_Ver3_Dlp.jpg?1618831957"
          description="Everyone wants one, but only a few can pull it off. It’s not even a question of price, as our recliner designs suit a wide range of budgets. It’s just that creating a business class look in the living room is not everyone’s cup of tea"
        />
      </div>

      <Grid
        container
        spacing={3}
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="fadeInUp"
      >
        <Grid item>
          <FormControl style={{ width: 180 }}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={null}
              onChange={console.log}
              fullWidth
            >
              <MenuItem value={10}>Price - Low to High</MenuItem>
              <MenuItem value={20}>Price - High to Low</MenuItem>
              <MenuItem value={30}>Rating - Top</MenuItem>
              <MenuItem value={30}>Rating - Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
     
        {!componentDataLoading ?  <Grid container spacing={2} className="fadeInUp">
          {currentViewItems.map((e) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ProductCard
              title={e.Name}
              subTitle={e.Description}
              price={e.Price.replace(/,/g, "").replace(/₹/g, "")}
              subNote={e.Emi}
              image={e.Image}
            />
          </Grid>
        ))}</Grid> : <L_Loader />}
    </Container>
  );
}

export default App;
