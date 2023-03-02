import React from "react"
import { Grid, Typography } from "@material-ui/core"

import RangeSlider from "./range-slider"

const prices = []
for (let i = 0; i < 500; i++) {
  prices.push(Math.floor(Math.random() * 80) + 1)
}

export function FilterByPrice() {
  return (
    <Grid container justify="center" style={{ marginTop: "33px" }}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Typography variant="h5">A Range Slider with Histogram</Typography>
        <Typography variant="subtitle2">
          built using{" "}
          <a href="https://github.com/sghall/react-compound-slider">
            React Compound Slider
          </a>
          ,{" "}
          <a href="https://github.com/jerairrest/react-chartjs-2">
            react chartjs 2
          </a>
          , and <a href="https://material-ui.com/">Material UI</a>
        </Typography>
      </Grid>
      <Grid item xs={12} lg={8}>
        <RangeSlider data={prices} />
      </Grid>
    </Grid>
  );
}