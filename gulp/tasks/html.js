import fileinclude from "gulp-file-include";
import webpHtmlnoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlMin from "gulp-htmlmin";
import pug from "gulp-pug";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fileinclude())
        // .pipe(pug({
        //     pretty: true,
        // }))
        .pipe(app.plugins.replace(/@img\//g, "images/"))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtmlnoSvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    "value": "%DT%",
                    "append": {
                        "key": "_v",
                        "cover": 0,
                        "to": [
                            "css",
                            "js"
                        ]
                    },
                    "output": {
                        "file": "gulp/version.json"
                    }
                })
            )
        )
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
};