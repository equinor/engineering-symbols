require('dotenv').config();
const fs = require('fs');

const config = {
	MSAL_CLIENT_ID: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID || '',
	MSAL_AUTHORITY: process.env.NEXT_PUBLIC_MSAL_AUTHORITY || '',
};

fs.writeFileSync('config.json', JSON.stringify(config));
console.log('⚡️', 'config.json created successfully');
