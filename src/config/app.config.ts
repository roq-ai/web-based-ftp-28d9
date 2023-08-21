interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Guest'],
  tenantRoles: ['Administrator', 'Team Member'],
  tenantName: 'Organization',
  applicationName: 'Web based FTP',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
