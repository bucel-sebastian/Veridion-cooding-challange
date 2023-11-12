import React from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
function IbcInsuranceCard({ ibcInsurance }) {
  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: "0 3px 10px 2px #1a1a1a45",
      }}
    >
      <CardContent>
        <Typography variant="h5" align="left">
          IBC Insurance
        </Typography>
        {ibcInsurance === null ? (
          <>
            <Typography variant="body2">There's no data..</Typography>
          </>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell align="right">Label</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ibcInsurance.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.code}</TableCell>
                    <TableCell align="right">{row.label}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default IbcInsuranceCard;
