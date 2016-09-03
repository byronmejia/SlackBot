import { CLIENT_EVENTS } from '@slack/client';

module.exports = function clientAuth(rtm) {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    console.log(
      `Logged in as ${rtmStartData.self.name}` +
      `of team ${rtmStartData.team.name}`
    );
  });
};
