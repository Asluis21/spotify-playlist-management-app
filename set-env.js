const fs = require('fs');
const envPath = './src/environments/environment.prod.ts';

let content = fs.readFileSync(envPath, 'utf8');
content = content.replace('${SPOTIFY_CLIENT_ID}', process.env.SPOTIFY_CLIENT_ID);
content = content.replace('${SPOTIFY_REDIRECT_URI}', process.env.SPOTIFY_REDIRECT_URI);

fs.writeFileSync(envPath, content);