const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // '@primary-color': '#f48549',
      // '@link-color': '#e6a07c',
      // '@font-size-base': '18px',
      '@layout-sider-background-light': '#fafafa',
    },
  }),
)
