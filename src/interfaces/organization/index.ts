import { FtpServerInterface } from 'interfaces/ftp-server';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  ftp_server?: FtpServerInterface[];
  user?: UserInterface;
  _count?: {
    ftp_server?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  phone?: string;
  website?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
