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
import React from "react";

function ContactInfoCard({ contactInfo }) {
  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: "0 3px 10px 2px #1a1a1a45",
      }}
    >
      <CardContent>
        <Typography variant="h5" align="left">
          Contact info
        </Typography>
        <div className="contact-info-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Phone Numbers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactInfo.phone_numbers === null ||
              contactInfo.phone_numbers?.length === 0 ? (
                <TableRow>
                  <TableCell>There's no phone number</TableCell>
                </TableRow>
              ) : (
                <>
                  {contactInfo.phone_numbers.map((phone, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <a href={`tel:${phone}`}>{phone}</a>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Emails</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactInfo.emails === null ||
              contactInfo.emails?.length === 0 ? (
                <TableRow>
                  <TableCell align="right">There's no email</TableCell>
                </TableRow>
              ) : (
                <>
                  {contactInfo.emails.map((emails, index) => (
                    <TableRow key={index}>
                      <TableCell align="right">
                        <a href={`mailto:${emails}`}>{emails}</a>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ContactInfoCard;
