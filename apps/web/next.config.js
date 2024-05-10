/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui", "antd", "zustand", "rc-util",
    'rc-pagination',
    'rc-picker', "@ant-design/icons", "@ant-design", "@babel/runtime"],
};
