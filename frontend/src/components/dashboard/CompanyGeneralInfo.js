import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import React from "react";

function CompanyGeneralInfo({ companyGeneralInfo }) {
  return (
    <>
      <Card variant="outlined" sx={{ boxShadow: "0 3px 10px 2px #1a1a1a45" }}>
        <CardContent>
          <Typography variant="h5" align="left">
            General info
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Company Legal Names</TableCell>
                <TableCell align="right">
                  {companyGeneralInfo.company_legal_names !== null ? (
                    <>
                      {companyGeneralInfo.company_legal_names.map(
                        (name) => name
                      )}
                    </>
                  ) : (
                    <>
                      <Typography variant="body2">There's no data..</Typography>
                    </>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Company Commercial Names</TableCell>
                <TableCell align="right">
                  {companyGeneralInfo.company_commercial_names !== null ? (
                    <>
                      {companyGeneralInfo.company_commercial_names.map(
                        (name) => name
                      )}
                    </>
                  ) : (
                    <>
                      <Typography variant="body2">There's no data..</Typography>
                    </>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year Founded</TableCell>
                <TableCell align="right">
                  {companyGeneralInfo.year_founded}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Main Business Category</TableCell>
                <TableCell align="right">
                  {companyGeneralInfo.main_business_category}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Main industry</TableCell>
                <TableCell align="right">
                  {companyGeneralInfo.main_industry}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default CompanyGeneralInfo;
