module.exports = function(api) {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '49',
                    firefox: '47',
                    opera: '36',
                },
            },
        ],
    ];
    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true,
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
