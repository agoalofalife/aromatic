module.exports = {
    entry: ["./index.ts"],
    output: {
        filename: "./index.js",
    },

    // Включить карты кода для отладки вывода webpack
    devtool: "source-map",

    resolve: {
        // Добавить разрешения '.ts' и '.tsx' к обрабатываемым
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    watch : true,
    watchOptions : {
        aggregateTimeout : 100
    },
    module: {
        loaders: [
            // Все файлы с разрешениями '.ts' или '.tsx' будет обрабатывать 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            // Все карты кода для выходных '.js'-файлов будет дополнительно обрабатывать `source-map-loader`
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};