import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { FaUsers } from "react-icons/fa6";

function NumOfEmployesCard({ numOfEmployes }) {
  const formatNumber = (number) => {
    if (Math.abs(number) >= 1e9) {
      const newNumber = (number / 1e9).toFixed(2);
      return newNumber % 1 === 0
        ? newNumber.replace(/\.00$/, "") + "B"
        : newNumber + "B";
    } else if (Math.abs(number) >= 1e6) {
      const newNumber = (number / 1e6).toFixed(2);

      return newNumber % 1 === 0
        ? newNumber.replace(/\.00$/, "") + "M"
        : newNumber + "M";
    } else if (Math.abs(number) >= 1e3) {
      const newNumber = (number / 1e3).toFixed(2);

      return newNumber % 1 === 0
        ? newNumber.replace(/\.00$/, "") + "K"
        : newNumber + "K";
    } else {
      return number.toString();
    }
  };
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          boxShadow: "0 3px 10px 2px #1a1a1a45",
          minHeight: "150px",
        }}
      >
        <CardContent>
          <div style={{ display: "grid" }} className="grid-2-col-3-1">
            <div>
              <Typography variant="h5" className="card-title">
                Employee Count
              </Typography>
              {numOfEmployes !== null ? (
                <Typography variant="h2" className="card-content">
                  {formatNumber(numOfEmployes)}
                </Typography>
              ) : (
                <Typography variant="body2" className="card-content">
                  There's no data..
                </Typography>
              )}

              {/* <Typography variant="h2">382M</Typography> */}
            </div>
            <div className="card-icon-container">
              <div
                className="card-icon"
                style={{
                  background: "#6464f4",
                }}
              >
                <FaUsers />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default NumOfEmployesCard;
