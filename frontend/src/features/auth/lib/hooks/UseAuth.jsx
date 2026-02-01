import React from 'react'
import { useContext } from 'react';
import { UserContext } from "../../model";

export const useAuth = () => {
  return useContext(UserContext);
};