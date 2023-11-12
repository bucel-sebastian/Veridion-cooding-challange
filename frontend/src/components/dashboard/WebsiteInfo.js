import {
  Card,
  Table,
  CardContent,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  capitalize,
  TableBody,
  Chip,
  Tab,
} from "@mui/material";
import React from "react";

function WebsiteInfo({ websiteData, websiteTechnologies }) {
  return (
    <Card
      variant="outlined"
      sx={{ boxShadow: "0 3px 10px 2px #1a1a1a45", width: "100%" }}
    >
      <CardContent>
        <Typography variant="h5" align="left">
          Website info -{" "}
          <a style={{ color: "#1a1a1a" }} href={websiteData.website_url}>
            {websiteData.website_domain}
          </a>
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.keys(websiteTechnologies).length === 0 ? (
            <>
              <Typography variant="body2">There's no data..</Typography>
            </>
          ) : (
            <Table>
              <TableBody style={{ textTransform: "capitalize" }}>
                {Object.entries(websiteTechnologies).map(([key, values]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <Typography variant="body1" align="left">
                        {key}
                      </Typography>
                    </TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {values.map((value, index) => (
                        <Typography variant="body1" key={index}>
                          {value}
                        </Typography>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default WebsiteInfo;
