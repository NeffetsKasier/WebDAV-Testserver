/*---Requirements---*/
  const webdav = require('webdav-server').v2;
 // const os = require('os');
  const FormData = require('form-data');
  const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// User manager (tells who are the users)
const userManager = new webdav.SimpleUserManager();
const user = userManager.addUser('username', 'password', false);

// Privilege manager (tells which users can access which files/folders)
const privilegeManager = new webdav.SimplePathPrivilegeManager();
privilegeManager.setRights(user, '/', [ 'all' ]);

const server = new webdav.WebDAVServer({
    // HTTP Digest authentication with the realm 'Default realm'
    httpAuthentication: new webdav.HTTPDigestAuthentication(userManager, 'Default realm'),
    privilegeManager: privilegeManager,
    port: 1900
});

server.setFileSystem('/',new webdav.VirtualFileSystem(new webdav.VirtualSerializer()),(success) => { 
  //server.start((s) => console.log('Server READY for connection: http://'+os.hostname+':'+s.address().port+'/'));
  server.start((s) => console.log('Server READY for connection'));
})

const s_filesystem = server.rootFileSystem();
const ctx = server.createExternalContext();

s_filesystem.on(ctx, 'create', (ctx, path, data) => {
  console.log('Create triggered!');
});

s_filesystem.on(ctx, 'delete', (ctx, path) => {
  console.log('Delete triggered!');
});
