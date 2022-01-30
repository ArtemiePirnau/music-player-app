export const songs = () => {
    return app.gulp.src(app.path.src.songs)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SONGS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.gulp.dest(app.path.build.songs))
};