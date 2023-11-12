import React from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Typography,
} from "@mui/material";
function NaicsInfoCard({ naicsData }) {
  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: "0 3px 10px 2px #1a1a1a45",
      }}
    >
      <CardContent>
        <Typography variant="h5" align="left">
          NAICS Info
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>NAICS 2022</TableCell>
              <TableCell align="right">
                {naicsData.naics_2022 !== null ? (
                  <>
                    {naicsData?.naics_2022?.primary !== null
                      ? `${naicsData.naics_2022?.primary["code"] ?? ""} - ${
                          naicsData.naics_2022?.primary["label"] ?? ""
                        } `
                      : ""}
                    {naicsData?.naics_2022?.secondary !== null
                      ? `${naicsData.naics_2022?.secondary[0]?.code ?? ""} - ${
                          naicsData.naics_2022?.secondary[0]?.label ?? ""
                        } `
                      : ""}
                  </>
                ) : (
                  <>
                    <Typography variant="body2">There's no data..</Typography>
                  </>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NACE REV2</TableCell>
              <TableCell align="right">
                {naicsData.nace_rev2 !== null ? (
                  <>
                    {naicsData.nace_rev2.map((row, index) => (
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
              <TableCell>NCCI Codes</TableCell>
              <TableCell align="right">
                {naicsData.ncci_codes_28_1 !== null ? (
                  <>
                    {" "}
                    {naicsData.ncci_codes_28_1.map((code, index) => (
                      <p key={index}>{code}</p>
                    ))}
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

export default NaicsInfoCard;
