/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["@repo/ui", "antd", "zustand", "rc-util",
    'rc-pagination',
    'rc-picker', "@ant-design/icons", "@ant-design", "@babel/runtime"],
};
