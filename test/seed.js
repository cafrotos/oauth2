module.exports = {
  users: [
    {
      id: 1,
      username: 'userone',
      password: 'passwordone',
      scopes: ['orders:read', 'orders:write']
    }
  ],
  applications: [
    {
      id: "1",
      name: 'panda',
      secret: 'panda',
      grants: ['password', 'refresh_token'],
      scopes: ['*']
    },
    {
      id: "2",
      name: 'authorise',
      secret: 'authorise',
      grants: ['authorization_code'],
      scopes: ['orders:read'],
      redirectUris: ['https://localhost:4000']
    },
    {
      id: "3",
      name: 'credential',
      secret: 'credential',
      grants: ['client_credentials'],
      scopes: ['*']
    }
  ]
}