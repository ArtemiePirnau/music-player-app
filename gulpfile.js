//Import Gulp Module
import gulp from "gulp";
//Import all paths
import { path } from "./gulp/config/path.js";

//Plugins
import { plugins } from "./gulp/config/plugins.js";

//Global Object

global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    path: path,
    gulp: gulp,
    plugins: plugins
}

//Import Tasks

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js"
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { songs } from "./gulp/tasks/songs.js";
import { otfTottf, ttfTowoff, fontsStyle } from "./gulp/tasks/fonts.js";
//Watcher Function

const watcher = () => {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.songs, songs);
};
const fonts = gulp.series(otfTottf, ttfTowoff, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, songs));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

export { dev };
export { build };

//Default Tas
gulp.task("default", dev);