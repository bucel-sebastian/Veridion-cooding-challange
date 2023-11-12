import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "../redux/slices/companiesSlice";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Button, IconButton, Tooltip } from "@mui/material";
import { FaBars, FaXmark } from "react-icons/fa6";

function Sidebar({ onChangeCompany, switchToAddCompanies }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.companies);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <div
            className={`sidebar-mobile ${
              isMobileMenuOpen ? "menu-opened" : ""
            }`}
          >
            <div className="sidebar-mobile-row">
              <div className="sidebar-buttons-container">
                <Button
                  variant="contained"
                  sx={{ justifyContent: "center !important" }}
                  onClick={() => switchToAddCompanies()}
                >
                  Add companies
                </Button>
                {companies === null || companies.length === 0 ? (
                  <>
                    <p style={{ textAlign: "center" }}>
                      There's no company here
                    </p>
                  </>
                ) : (
                  <>
                    {companies.map((company, index) => (
                      <div key={index}>
                        {company?.companyData ? (
                          <Button
                            onClick={() => {
                              onChangeCompany(company.id);
                            }}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "100%",
                            }}
                          >
                            {company.companyData.company_name}
                          </Button>
                        ) : (
                          <Tooltip title="Data is loading">
                            <div>
                              <LoadingButton
                                // endIcon={<SendIcon />}
                                loading
                                loadingPosition="end"
                                endIcon={<SendIcon />}
                                variant="text"
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "100%",
                                }}
                              >
                                {company.name}
                              </LoadingButton>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="sidebar-mobile-toggle-button-container">
                <IconButton onClick={toggleMobileMenu} size="large">
                  {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
                </IconButton>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar-desktop">
            <div className="sidebar-buttons-container">
              <Button
                variant="contained"
                sx={{ justifyContent: "center !important" }}
                onClick={() => switchToAddCompanies()}
              >
                Add companies
              </Button>
              {companies === null || companies.length === 0 ? (
                <>
                  <p style={{ textAlign: "center" }}>There's no company here</p>
                </>
              ) : (
                <>
                  {companies.map((company, index) => (
                    <div key={index}>
                      {company?.companyData ? (
                        <Button
                          onClick={() => {
                            onChangeCompany(company.id);
                          }}
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                          }}
                        >
                          {company.companyData.company_name}
                        </Button>
                      ) : (
                        <Tooltip title="Data is loading">
                          <div>
                            <LoadingButton
                              // endIcon={<SendIcon />}
                              loading
                              loadingPosition="end"
                              endIcon={<SendIcon />}
                              variant="text"
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                              }}
                            >
                              {company.name}
                            </LoadingButton>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
