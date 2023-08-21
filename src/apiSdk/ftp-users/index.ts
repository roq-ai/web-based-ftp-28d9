import axios from 'axios';
import queryString from 'query-string';
import { FtpUserInterface, FtpUserGetQueryInterface } from 'interfaces/ftp-user';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFtpUsers = async (query?: FtpUserGetQueryInterface): Promise<PaginatedInterface<FtpUserInterface>> => {
  const response = await axios.get('/api/ftp-users', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFtpUser = async (ftpUser: FtpUserInterface) => {
  const response = await axios.post('/api/ftp-users', ftpUser);
  return response.data;
};

export const updateFtpUserById = async (id: string, ftpUser: FtpUserInterface) => {
  const response = await axios.put(`/api/ftp-users/${id}`, ftpUser);
  return response.data;
};

export const getFtpUserById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/ftp-users/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFtpUserById = async (id: string) => {
  const response = await axios.delete(`/api/ftp-users/${id}`);
  return response.data;
};
