import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
  },
  reducers: {
    addCompany: (state, action) => {
      state.companies = [...state.companies, ...action.payload];
    },
    updateCompany: (state, action) => {
      const { id, companyData, reviewsSummary } = action.payload;
      const alreadyExistIndex = state.companies.reduce((count, company) => {
        if (companyData.soleadify_id === company.companyData?.soleadify_id) {
          return count + 1;
        }
        return count;
      }, 0);

      const companyIndex = state.companies.findIndex(
        (company) => company.id === id
      );

      if (
        companyIndex !== -1 &&
        (alreadyExistIndex === 1 || alreadyExistIndex === 0)
      ) {
        state.companies[companyIndex] = {
          ...state.companies[companyIndex],
          companyData: {
            ...state.companies[companyIndex]?.companyData,
            ...companyData,
          },
          reviewsSummary: {
            ...state.companies[companyIndex]?.reviewsSummary,
            ...reviewsSummary,
          },
        };
      } else {
        const companyIndex = state.companies.findIndex(
          (company) => company.id === id
        );
        if (companyIndex !== -1) {
          state.companies.splice(companyIndex, 1);
        }
      }
    },
    removeCompany: (state, action) => {
      const { id } = action.payload;
      const companyIndex = state.companies.findIndex(
        (company) => company.id === id
      );
      if (companyIndex !== -1) {
        state.companies.splice(companyIndex, 1);
      }
    },
  },
});

export default companiesSlice.reducer;
export const {
  addCompany,
  updateCompany,
  removeCompany,
  compareCompaniesWithExisting,
} = companiesSlice.actions;
