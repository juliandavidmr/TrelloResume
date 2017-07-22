module.exports = {
  distDir: 'build',
  webpack: (config) => {
    // Remove minifed react aliases for material-ui so production builds work
    if (config.resolve.alias) {
      delete config.resolve.alias.react
      delete config.resolve.alias['react-dom']
    }
    config.node = {
      fs: 'empty',
      child_process: 'empty'
    };
    
    return config
  },
  exportPathMap() {
    return {
      '/': {
        page: '/'
      },
    }
  }
}