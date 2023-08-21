import { FtpUserInterface } from 'interfaces/ftp-user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface FtpServerInterface {
  id?: string;
  name: string;
  ip_address: string;
  port: number;
  organization_id: string;
  username?: string;
  password?: string;
  created_at?: any;
  updated_at?: any;
  ftp_user?: FtpUserInterface[];
  organization?: OrganizationInterface;
  _count?: {
    ftp_user?: number;
  };
}

export interface FtpServerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  ip_address?: string;
  organization_id?: string;
  username?: string;
  password?: string;
}
