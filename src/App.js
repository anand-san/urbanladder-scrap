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
import LucidLoader from "./Components/Loader";
import InlineError from "./Components/InlineErrorBoundary";
import {sort_by_key} from "./Utils/utilityFunctions"

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [navigationBarData, setNavigationBarData] = React.useState([]);
  const [productsData, setProductsData] = React.useState();
  const [currentViewItems, setCurrentViewItems] = React.useState([]);
  const [tabValue, setTabValue] = React.useState(0);
  const [componentDataLoading, setComponentDataLoading] = React.useState(false);
  const [sortType, setSortType] = React.useState(0);
  const sortByCategory = (category) => {
    let sortedArr = currentViewItems
    switch (category) {
      case 0:
        setCurrentViewItems(productsData[navigationBarData[tabValue]])
        break
      case 1:
        sortedArr = sort_by_key(currentViewItems, "Price")
        sortedArr.splice(0, 1, sortedArr.pop())
        setCurrentViewItems(sortedArr)
        break
      case 2:
        sortedArr = sort_by_key(currentViewItems, "Price")
        sortedArr.reverse()
        sortedArr.push(sortedArr.shift())
        setCurrentViewItems(sortedArr)
        break
      case 3:
        sortedArr = sort_by_key(currentViewItems, "Rating")
        setCurrentViewItems(sortedArr)
        break
      case 4:
        sortedArr = sort_by_key(currentViewItems, "Rating")
        sortedArr.reverse()
        setCurrentViewItems(sortedArr)
        break
      default:
        return;
    }
  };

  const searchByName = (query) => {
    if (!query.target.value)
      setCurrentViewItems(productsData[navigationBarData[tabValue]]);
    setCurrentViewItems(
      navigationBarData.reduce((a, c) => {
        let results = productsData[c].reduce((a1, c1) => {
          if (c1.Name.toLowerCase().includes(query.target.value.toLowerCase())) a1.push(c1);
          return a1;
        }, []);
        console.log(a);
        a = [...a, ...results];
        return a;
      }, [])
    );
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSortType(0)
    setComponentDataLoading(true);
    setTimeout(() => {
      setCurrentViewItems(productsData[navigationBarData[newValue]]);
      setComponentDataLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    FetchData()
      .then((data) => {
        let types = Object.keys(data);
        setNavigationBarData(types);
        setProductsData(data);
        setCurrentViewItems(data[types[tabValue]]);
      })
      .catch((e) => setIsError(e.message || e))
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    setIsLoading,
    setCurrentViewItems,
    setProductsData,
    setNavigationBarData,
    setTabValue
  ]);

  if (isLoading) return <LucidLoader />;

  if (isError) return <InlineError error={isError} />;

  return (
    <Container maxWidth="lg">
      <Header
        searchByName={searchByName}
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
              value={sortType}
              onChange={(e) => {
                setSortType(e.target.value);
                sortByCategory(e.target.value);
              }}
              fullWidth
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>Price - Low to High</MenuItem>
              <MenuItem value={2}>Price - High to Low</MenuItem>
              <MenuItem value={3}>Rating - Low to High</MenuItem>
              <MenuItem value={4}>Rating - High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {!componentDataLoading ? (
        <div container spacing={2} className="fadeInUp" style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
          {currentViewItems.map((e) => (
            <div item xs={12} sm={6} md={4} lg={3} xl={2}>
              <ProductCard
                title={e.Name}
                subTitle={e.Description}
                price={e.Price}
                subNote={e.Emi}
                image={e.Image}
                rating={e.Rating}
              />
            </div>
          ))}
        </div>
      ) : (
        <LucidLoader />
      )}
    </Container>
  );
}

export default App;
