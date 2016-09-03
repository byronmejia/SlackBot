/**
 * Created by byron on 3/09/2016.
 */
import path from 'path';
import fs from 'fs';

export function getAPIKey(TOKEN_NAME) {
  if (process.env[TOKEN_NAME]) {
    return { token: process.env[TOKEN_NAME] };
  }

  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '..', 'config', 'keys', `${TOKEN_NAME}.json`),
      'utf8'
    )
  );
}

export function printAuth(rtmStartData) {
  console.log(
    `Logged in as ${rtmStartData.self.name} ` +
    `of team ${rtmStartData.team.name}.`
  );
}

export function getPlugins(folder) {
  const plugins = [];
  fs.readdirSync(folder).forEach((dir) => {
    if (dir.endsWith('Plugin')) {
      fs.readdirSync(path.join(folder, dir)).forEach((index) => {
        const pluginPath = path.join(folder, dir, index);
        plugins.push(pluginPath);
      });
    }
  });
  return plugins;
}

export function activatePlugins(plugins, rtm) {
  plugins.forEach((plugin) => {
    require(plugin)(rtm); // eslint-disable-line global-require
  });
}
