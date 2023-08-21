import { FtpUserInterface } from 'interfaces/ftp-user';
import { GetQueryInterface } from 'interfaces';

export interface FolderInterface {
  id?: string;
  name: string;
  ftp_user_id: string;
  path?: string;
  size?: number;
  last_modified?: any;
  created_at?: any;
  updated_at?: any;

  ftp_user?: FtpUserInterface;
  _count?: {};
}

export interface FolderGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  ftp_user_id?: string;
  path?: string;
}
