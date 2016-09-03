import path from 'path';
import SlackClient from '@slack/client';
import { getAPIKey, getPlugins, activatePlugins } from './helpers/secretUtil';

const token = getAPIKey('SLACK_API');
const RtmClient = SlackClient.RtmClient;
const rtm = new RtmClient(token.TOKEN);
const pluginFolder = path.join(__dirname, 'plugins');
const plugins = getPlugins(pluginFolder);

activatePlugins(plugins, rtm);

rtm.start();
