import React, { createContext, useState } from 'react';
import { DashboardData } from '../interfaces/dashboard-data';

const initialDataValue: DashboardData = {
  recordsByMinute: [],
  recordsBySize: [],
  recordsByMethod: [],
  recordsByAnswerCode: [],
};

const storeData = (data: DashboardData) => {};
export const DashboardContext = createContext({ data: initialDataValue, setData: storeData });


const DashboardContextProvider = ({ children }: { children: JSX.Element }) => {
  const [ data, setData ] = useState<DashboardData>(initialDataValue);
  return (
    <DashboardContext.Provider value={{ data, setData }}>
      {children}
    </DashboardContext.Provider>
  )
}
export default DashboardContextProvider;
