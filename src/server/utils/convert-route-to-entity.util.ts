const mapping: Record<string, string> = {
  folders: 'folder',
  'ftp-servers': 'ftp_server',
  'ftp-users': 'ftp_user',
  guests: 'guest',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
