import { FtpUserInterface } from 'interfaces/ftp-user';
import { GetQueryInterface } from 'interfaces';

export interface GuestInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  ftp_user_id: string;
  phone?: string;
  address?: string;
  created_at?: any;
  updated_at?: any;

  ftp_user?: FtpUserInterface;
  _count?: {};
}

export interface GuestGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  ftp_user_id?: string;
  phone?: string;
  address?: string;
}
