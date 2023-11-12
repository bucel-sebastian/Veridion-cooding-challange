import React from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { Chart } from "react-google-charts";

function MapLocations({ locationsData, numLocations }) {
  return (
    <>
      <Card variant="outlined" sx={{ boxShadow: "0 3px 10px 2px #1a1a1a45" }}>
        <CardContent>
          <Typography variant="h5" align="left">
            Locations - {numLocations}
          </Typography>
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = locationsData[selection[0].row + 1];
                },
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="450px"
            data={locationsData}
            options={{
              colorAxis: { colors: ["#60cea8", "#6464f4", "#f44434"] },
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default MapLocations;
