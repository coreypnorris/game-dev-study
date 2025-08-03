module.exports = {
    server: {
        baseDir: "./",
        index: "index.html"
    },
    files: [
        {
            match: ["dist/**/*.js", "dist/**/*.js.map"],
            fn: function (event, file) {
                console.log(`File changed: ${file}`);
                this.reload();
            }
        },
        "css/**/*.css",
        "*.html"
    ],
    port: 8080,
    open: false,
    notify: false,
    reloadDelay: 0,
    reloadDebounce: 1000,
    watchEvents: ['change', 'add'],
    watchOptions: {
        ignoreInitial: true,
        ignored: ['node_modules/**', '.git/**']
    }
};