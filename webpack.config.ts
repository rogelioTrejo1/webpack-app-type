//Configuro las variables de entorno en la confiruracion de webpack
import { config } from "dotenv";
config();

//Dependencias de configuración
import { Configuration,  } from "webpack";
import path from "path";
import htmlWebpackPlugin from "html-webpack-plugin"
import miniCssExtractPlugin from "mini-css-extract-plugin";
import DotEnv from "dotenv-webpack";

//Configuración extra para el entorno de desarrollo "webpack-dev-server"
interface WebpackConfig extends Configuration {
    devServer : {
        port: any
    }
}

/**
 * Configuración basica para un proyecto usando webpack para mejorar un entorno 
 * de desarrollo:
 * 
 * Para mayor información acerca de webpack visita: https://webpack.js.org/
 */

//Configuraciones de webpack
const webpackConfig: WebpackConfig = {

    /**
     * Se define donde es encontrara el archivo principal que ejecutara la aplicación.
     */
    entry: {
        main: "./src/index.ts"
    },
    /**
     * Se define la salida del los archivos compilados y/o traspilados para su ejecusión.
     * 
     * En caso opcional que desee cambiar la ruta de salida debe canbiar los textos
     * en los siguientes lugares:
     * 
     *  output: {
     *      path: path.resolve(__dirname, "Nombre de la carpeta de salida"),
     *      filename: "Nombre del archivo de salida"
     *  }
     *  
     */
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/bandle.js"
    },
    /**
     * Se establece todas aquellas extenciones de archivos que pobra leer la configuración de webpack
     */
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    /**
     * Se establesen todas las reglas basicas en la lectura y escaneo de los achivos:
     *      -typescript
     *      -hadlebars
     *      -HTML
     *      -Sass
     *      -CSS
     *      Imagenes (tipo: jpg, png, gif o jpeg)
     * 
     * En caso de nesesitarlo, puede cambiar esta configuración a la que mas le agrade
     * y requiera el proyecto. 
     */
    module: {
        rules: [
            // Lectura de los archivos de Typescript (.ts)
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            // Lectura de los archivos handlebars (.hbs o .handlebars)
            {
                test: /\.(hbs|handlebars)$/,
                use: "handlebars-loader"
            },
            // Lecturea de los archivos de Syles (.scss y/o .css)
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            //Lectura de los archivos media (jpg, png, gif o jpeg)
            {
                test: /\.(ico|jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "static/",
                        useRelativePath: true
                    }
                }]
            },
            /**
             * Se establese una manera de optimizar las imagenes que se implementen en
             * la aplicación.
             * 
             * Si sedesea cambiar los valores, se puede realizar siguiende la documentación
             * en: https://www.npmjs.com/package/image-webpack-loader para una mejor optimización.
             */
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    optipng: {
                        enabled: false,
                    },
                    pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    webp: {
                        quality: 75
                    }
                }
            }
        ]
    },
    /**
     * Se establesen 2 plugin basicos en esta configuración:
     *      -**html-webpack-plugin: Con el fin de manejar todo los archivos
     *      HTML que existan en la aplicación.
     * 
     *      -**mini-css-extract-plugin: Con la finalidad de manegar los 
     *      archivos que sean "Styles" la aplicación
     * 
     * Si se desea cambiar la alguna configuración, verifique sus documentaciones en:
     *      
     */
    plugins: [
        //Manejo de todo el HTML o algun motor de platillas que se desee ocupar
        new htmlWebpackPlugin({
            template: path.relative(__dirname, './src/views/index.hbs'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        //Manejo de todo el CSS o archivos de un pre procesador de CSS
        new miniCssExtractPlugin({
            filename: "css/bandle.css"
        }),
        new DotEnv()
    ],
    /**
     * Se establesen las configuraciones de un servidor de desarrollo para una
     * mejor facilidad de creación.
     * 
     * Si se desean cambiar, verifique la documentacion en: https://www.npmjs.com/package/webpack-dev-server
     * 
     * Nota: Al ocupar typescript como lenguaje de configuración no se tiene en la documentacion oficial alguna
     * interface o dato quue nos ayude al autocomplementado, es por eso que se crea una interface que hereda 
     * todas las configuraciones de webpack añadiendo la configuracion de webpack-dev-server
     * 
     * */
    devServer: {
        port: process.env.PORT
      }
};

export default webpackConfig;
