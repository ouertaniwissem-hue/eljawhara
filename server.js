const { open } = require('./server/db');
const { createApp } = require('./server/app');

const port = Number(process.env.PORT || 5173);
const db = open();
createApp(db).listen(port, process.env.HOST || '0.0.0.0', () => console.log(`El Jawhara store: http://localhost:${port}${process.env.ADMIN_ENABLED === '1' ? `  ·  admin: http://localhost:${port}/admin` : ''}`));
