import React, { createContext, useState } from 'react';
import { DashboardData } from '../interfaces/dashboard-data';

const initialDataValue: DashboardData = {
  recordsByMinute: [],
  recordsBySize: [],
  recordsByMethod: [],
  recordsByAnswerCode: [],
};


export const DashboardContext = createContext({ data: initialDataValue, setData: (data: DashboardData) : void => {} });

/**
 * Dashboard context responsible for holding app data
 * @function
 * @param children Children component
 * @returns element Dashboard context element
 */
const DashboardContextProvider = ({ children }: { children: JSX.Element }) => {
  const [ data, setData ] = useState<DashboardData>(initialDataValue);
  const storeData = (data: DashboardData) : void => {
    setData(data);
  }
  return (
    <DashboardContext.Provider value={{ data, setData: storeData }}>
      {children}
    </DashboardContext.Provider>
  )
}
export default DashboardContextProvider;
