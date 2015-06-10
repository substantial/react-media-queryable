var path = require('path');

module.exports = {
  output: {
    filename: './react_media_queryable.js',
    library: 'MediaQueryable',
    libraryTarget: 'umd'
  },
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ]
};
