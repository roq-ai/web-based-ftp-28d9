import axios from 'axios';
import queryString from 'query-string';
import { FtpServerInterface, FtpServerGetQueryInterface } from 'interfaces/ftp-server';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFtpServers = async (
  query?: FtpServerGetQueryInterface,
): Promise<PaginatedInterface<FtpServerInterface>> => {
  const response = await axios.get('/api/ftp-servers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFtpServer = async (ftpServer: FtpServerInterface) => {
  const response = await axios.post('/api/ftp-servers', ftpServer);
  return response.data;
};

export const updateFtpServerById = async (id: string, ftpServer: FtpServerInterface) => {
  const response = await axios.put(`/api/ftp-servers/${id}`, ftpServer);
  return response.data;
};

export const getFtpServerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/ftp-servers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFtpServerById = async (id: string) => {
  const response = await axios.delete(`/api/ftp-servers/${id}`);
  return response.data;
};
