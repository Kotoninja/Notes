import React from 'react'
import { useContext } from 'react';
import { UserContext } from '@/app/providers/UserProvider/UserContext';

export const useAuth = () => {
  const context = useContext(UserContext);
};