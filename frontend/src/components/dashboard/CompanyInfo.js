import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";

function CompanyInfo({ companyInfo }) {
  const [showLongDescription, setShowLongDescription] = useState(false);

  useEffect(() => {
    setShowLongDescription(false);
  }, [companyInfo]);
  return (
    <>
      <Card
        variant="outlined"
        sx={{ boxShadow: "0 3px 10px 2px #1a1a1a45", width: "100%" }}
      >
        <CardContent>
          <Typography variant="h4" align="left">
            {companyInfo.company_name} - Dashboard
          </Typography>
          {companyInfo?.short_description !== null ? (
            <>
              <Typography variant="body2" align="justify" gutterBottom>
                {showLongDescription
                  ? companyInfo.long_description
                  : companyInfo.short_description}
              </Typography>
              {companyInfo?.long_description !== null ? (
                <>
                  <Button
                    variant="outlined"
                    type="submit"
                    color="primary"
                    sx={{ marginLeft: 0, marginRight: "auto", float: "none" }}
                    onClick={() => {
                      setShowLongDescription(!showLongDescription);
                    }}
                  >
                    {showLongDescription ? "Read less" : "Read more"}
                  </Button>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default CompanyInfo;
