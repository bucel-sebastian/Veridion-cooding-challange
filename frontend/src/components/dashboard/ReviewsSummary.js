import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

function ReviewsSummary({ companyReview }) {
  const reviewText = companyReview?.content;
  return (
    <>
      <Card
        variant="outlined"
        sx={{ boxShadow: "0 3px 10px 2px #1a1a1a45", width: "100%" }}
      >
        <CardContent>
          <Typography variant="h4" align="left">
            Reviews Summary
          </Typography>
          <Typography variant="body2" align="justify" gutterBottom>
            {Object.keys(companyReview).length === 0 ? (
              <>We didn't find any reviews</>
            ) : (
              <>{reviewText}</>
            )}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ReviewsSummary;
