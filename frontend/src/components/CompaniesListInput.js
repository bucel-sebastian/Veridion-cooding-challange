import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FaXmark } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "../global.css";
import { useDispatch, useSelector } from "react-redux";

import {
  addCompany,
  removeCompany,
  updateCompany,
  compareCompaniesWithExisting,
} from "../redux/slices/companiesSlice";

function CompaniesListInput({ socketId, socket, onJobCompleted }) {
  const dispatch = useDispatch();
  // const { companies } = useSelector((state) => state.companies);
  const [companiesInput, setCompanies] = useState([
    { name: "", address: "", website: "" },
  ]);

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleAddCompany = () => {
    setCompanies([...companiesInput, { name: "", address: "", website: "" }]);
  };

  const handleRemoveCompany = (index) => {
    const updatedCompanies = [...companiesInput];
    updatedCompanies.splice(index, 1);
    setCompanies(updatedCompanies);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companiesWithIds = companiesInput.map((company) => ({
      ...company,
      id: uuidv4(),
    }));
    setIsSubmitLoading(true);
    // const requestData = {
    //   socketId: socketId,
    //   companies: companiesWithIds,
    // };
    try {
      companiesWithIds.forEach((company) => {
        socket.emit("addToQueue", company);
      });

      dispatch(addCompany(companiesWithIds));
      toast.success("Companies added to queue, data is loading!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("An error occurred", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    document.getElementById("companies-form").reset();
    setCompanies([{ name: "", address: "", website: "" }]);
    setIsSubmitLoading(false);
  };

  const handleRemoveCompanyRedux = async (data) => {
    dispatch(removeCompany(data));
  };

  const handleUpdateCompanyRedux = async (data) => {
    dispatch(updateCompany(data));
  };

  const handleJobCompleted = (data) => {
    // console.log("Job completed", data);
    onJobCompleted(data);

    if (data.companyData === 0) {
      handleRemoveCompanyRedux(data);

      toast.error(`We didn't find any informations about ${data.name}!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      handleUpdateCompanyRedux(data);
      toast.success(`${data.companyData.company_name} dashboard is ready!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    socket.on("companyJobCompleted", handleJobCompleted);
    return () => {
      socket.off("companyJobCompleted", handleJobCompleted);
    };
  }, [socket]);

  return (
    <div className="companies-form-container">
      <h1>Enter companies</h1>

      {/* <p>You can add more companies</p> */}
      <form id="companies-form" onSubmit={handleSubmit}>
        <div className="Companies">
          {companiesInput.map((company, index) => (
            <div key={index} className="company-row-inputs-container">
              <div className="company-row-inputs">
                <TextField
                  required
                  label="Company Name"
                  value={company.name}
                  onChange={(event) => {
                    const updatedCompanies = [...companiesInput];
                    updatedCompanies[index].name = event.target.value;
                    setCompanies(updatedCompanies);
                  }}
                  type="text"
                />
                <TextField
                  required
                  label="Address"
                  value={company.address}
                  onChange={(event) => {
                    const updatedCompanies = [...companiesInput];
                    updatedCompanies[index].address = event.target.value;
                    setCompanies(updatedCompanies);
                  }}
                  type="text"
                />
                <TextField
                  label="Website"
                  value={company.website}
                  onChange={(event) => {
                    const updatedCompanies = [...companiesInput];
                    updatedCompanies[index].website = event.target.value;
                    setCompanies(updatedCompanies);
                  }}
                  type="text"
                />
              </div>
              {companiesInput.length > 1 ? (
                <>
                  <Tooltip title="Remove">
                    <IconButton
                      onClick={() => handleRemoveCompany(index)}
                      color="error"
                      type="button"
                    >
                      <FaXmark />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                ""
              )}
            </div>
          ))}
          <div className="companies-form-buttons">
            <Button
              variant="contained"
              color="info"
              type="button"
              onClick={handleAddCompany}
            >
              Add Company
            </Button>
            {isSubmitLoading ? (
              <LoadingButton loading variant="contained" color="primary">
                Submit
              </LoadingButton>
            ) : (
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            )}
          </div>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default CompaniesListInput;
