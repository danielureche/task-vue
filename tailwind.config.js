import flowbitePlugin from 'flowbite/plugin'

export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/flowbite-vue/**/*.{js,ts,vue}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        flowbitePlugin
    ],
}