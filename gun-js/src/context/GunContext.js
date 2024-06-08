import React, { createContext, useContext } from "react";
import gun from "../gun/gun";

const GunContext = createContext();

export const GunProvider = ({ children }) => (
  <GunContext.Provider value={gun}>{children}</GunContext.Provider>
);

export const useGun = () => useContext(GunContext);
