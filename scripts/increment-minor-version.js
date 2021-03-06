const fs = require('fs');

const appJSON = JSON.parse(fs.readFileSync(`${__dirname}/../app.json`));

const curVersion = appJSON.expo.version.split('.').map(substring => Number(substring));
const newVersionMinorIncrement = [...curVersion];
newVersionMinorIncrement[2] += 1;
const newVersion = newVersionMinorIncrement.join('.');

const curVersionCode = appJSON.expo.android.versionCode;
const newVersionCode = curVersionCode + 1;

console.log('\n\nNew version:', newVersion);
console.log('New versionCode:', newVersionCode);

const newAppJSON = { ...appJSON };

newAppJSON.expo.version = newVersion;
newAppJSON.expo.ios.buildNumber = newVersion;
newAppJSON.expo.android.versionCode = newVersionCode;

fs.writeFileSync(`${__dirname}/../app.json`, JSON.stringify(newAppJSON));

console.log('Succesfully wrote edited app.json');
