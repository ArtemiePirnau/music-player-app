import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQuaries from "gulp-group-css-media-queries";
const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, "../images/"))
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQuaries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    cascade: true,
                    overrideBrowsersList: ["last 3 versions"]
                })
            )
        )

    // .pipe(groupCssMediaQuaries())
    // .pipe(webpcss({
    //     webpClass: ".webp",
    //     noWebpClass: ".no-webp"
    // }))
    // .pipe(autoprefixer({
    //     grid: true,
    //     cascade: true,
    //     overrideBrowsersList: ["last 3 versions"]
    // }))
    //Daca vrei sa ai copie la CSS necompresat
    .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
};