import axios from 'axios';
import queryString from 'query-string';
import { GuestInterface, GuestGetQueryInterface } from 'interfaces/guest';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGuests = async (query?: GuestGetQueryInterface): Promise<PaginatedInterface<GuestInterface>> => {
  const response = await axios.get('/api/guests', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createGuest = async (guest: GuestInterface) => {
  const response = await axios.post('/api/guests', guest);
  return response.data;
};

export const updateGuestById = async (id: string, guest: GuestInterface) => {
  const response = await axios.put(`/api/guests/${id}`, guest);
  return response.data;
};

export const getGuestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/guests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGuestById = async (id: string) => {
  const response = await axios.delete(`/api/guests/${id}`);
  return response.data;
};
