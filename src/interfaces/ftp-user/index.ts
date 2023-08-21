import { FolderInterface } from 'interfaces/folder';
import { GuestInterface } from 'interfaces/guest';
import { FtpServerInterface } from 'interfaces/ftp-server';
import { GetQueryInterface } from 'interfaces';

export interface FtpUserInterface {
  id?: string;
  username: string;
  password: string;
  rights: string;
  ftp_server_id: string;
  folder_path?: string;
  active?: boolean;
  created_at?: any;
  updated_at?: any;
  folder?: FolderInterface[];
  guest?: GuestInterface[];
  ftp_server?: FtpServerInterface;
  _count?: {
    folder?: number;
    guest?: number;
  };
}

export interface FtpUserGetQueryInterface extends GetQueryInterface {
  id?: string;
  username?: string;
  password?: string;
  rights?: string;
  ftp_server_id?: string;
  folder_path?: string;
}
