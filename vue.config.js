module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extraResources: [
          {
            from: 'keylogger/',
            to: 'keylogger/',
          },
        ],
      },
    },
  },
};
