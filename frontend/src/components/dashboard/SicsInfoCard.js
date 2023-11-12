import React from "react";
import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
function SicsInfoCard({ sicsData }) {
  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: "0 3px 10px 2px #1a1a1a45",
      }}
    >
      <CardContent>
        <Typography variant="h5" align="left">
          SIC Info
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>SICS Industry</TableCell>
              <TableCell align="right">
                {`${sicsData?.sics_industry?.code ?? ""} - ${
                  sicsData?.sics_industry?.label ?? ""
                }`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SICS Sector</TableCell>
              <TableCell align="right">
                {`${sicsData?.sics_sector?.code ?? ""} - ${
                  sicsData?.sics_sector?.label ?? ""
                }`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SICS Subsector</TableCell>
              <TableCell align="right">
                {`${sicsData?.sics_subsector?.code ?? ""} - ${
                  sicsData?.sics_subsector?.label ?? ""
                }`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SIC</TableCell>
              <TableCell align="right">
                {sicsData.sic !== null ? (
                  <>
                    {sicsData.sic.map((row, index) => (
                      <p key={index}>
                        {row?.code ?? ""} - {row?.label ?? ""}
                      </p>
                    ))}
                  </>
                ) : (
                  <>
                    <Typography variant="body2">There's no data..</Typography>
                  </>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ISIC V4</TableCell>
              <TableCell align="right">
                {sicsData.isic_v4 !== null ? (
                  <>
                    {sicsData.isic_v4.map((row, index) => (
                      <p key={index}>
                        {row?.code ?? ""} - {row?.label ?? ""}
                      </p>
                    ))}{" "}
                  </>
                ) : (
                  <>
                    <Typography variant="body2">There's no data..</Typography>
                  </>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default SicsInfoCard;
