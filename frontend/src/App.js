import "./App.css";
import "./global.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CompaniesListInput from "./components/CompaniesListInput";
import io from "socket.io-client";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { StoreProvider } from "./redux/StoreProvider";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const socket = io.connect(`${process.env.REACT_APP_BACKEND_URL}`);

function App() {
  const [socketId, setSocketId] = useState("");
  const [actualCompanyData, setActualCompanyData] = useState(null);
  const [addCompaniesIsVisible, setAddCompaniesIsVisible] = useState(true);
  // console.log(
  //   `${process.env.REACT_APP_BACKEND_URL}  -  ${process.env.REACT_APP_BACKEND_PORT}`
  // );

  const handleJobCompleted = (data) => {
    setActualCompanyData(data);
  };

  const handleSwitchToAddCompanies = () => {
    setAddCompaniesIsVisible(true);
  };

  const { companies } = useSelector((state) => state.companies);
  const handleChangeCompany = (id) => {
    setAddCompaniesIsVisible(false);
    const actualCompany = companies.filter((company) => {
      if (company.id === id) return company;
    });
    setActualCompanyData(actualCompany[0]);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket id - ", socket.id);
      setSocketId(socket.id);
    });
  }, [socket]);
  return (
    <StoreProvider>
      <div className="App">
        <Sidebar
          onChangeCompany={handleChangeCompany}
          switchToAddCompanies={handleSwitchToAddCompanies}
        />
        <div className="content">
          {addCompaniesIsVisible ? (
            <>
              <CompaniesListInput
                existingCompanies={companies}
                socketId={socketId}
                socket={socket}
                onJobCompleted={handleJobCompleted}
              />
            </>
          ) : (
            <>
              {actualCompanyData !== null ? (
                <Dashboard actualCompanyData={actualCompanyData} />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
