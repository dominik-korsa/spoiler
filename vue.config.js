module.exports = {
  pages: {
    index: {
      entry: 'src/pages/home/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Spoiler warning creator',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    warning: {
      entry: 'src/pages/warning/main.js',
      template: 'public/index.html',
      filename: 'warning.html',
      title: 'Spoiler warning',
      chunks: ['chunk-vendors', 'chunk-common', 'warning'],
    },
  },
};
