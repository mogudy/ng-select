import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as angularExternals from 'webpack-angular-externals';
import * as rxjsExternals from 'webpack-rxjs-externals';

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());

function nbxxExternalsFactory() {
  return function (context, request, callback) {
    if (request.startsWith('@nbxx/')) {
      return callback(null, {
        root: ['nb', request.replace(/^@nbxx\//, '')],
        commonjs: request,
        commonjs2: request,
        amd: request
      });
    }
    callback();
  };
}

export default {
  entry: {
    'index.umd': './src/index.ts',
    'index.umd.min': './src/index.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'nbinput'
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  },
  externals: [
    angularExternals(),
    rxjsExternals(),
    nbxxExternalsFactory(),
    {
      'ng-zorro-antd' : {
        commonjs: 'ng-zorro-antd',
        commonjs2: 'ng-zorro-antd',
        amd: 'ng-zorro-antd',
        root: 'ng-zorro-antd' // indicates global variable
      },
      'ng2-date-picker' : {
        commonjs: 'ng2-date-picker',
        commonjs2: 'ng2-date-picker',
        amd: 'ng2-date-picker',
        root: 'ng2-date-picker' // indicates global variable
      },
      'moment' : {
        commonjs: 'moment',
        commonjs2: 'moment',
        amd: 'moment',
        root: 'moment' // indicates global variable
      },
      'hammerjs' : {
        commonjs: 'hammerjs',
        commonjs2: 'hammerjs',
        amd: 'hammerjs',
        root: 'hammerjs' // indicates global variable
      },
      'mousetrap' : {
        commonjs: 'mousetrap',
        commonjs2: 'mousetrap',
        amd: 'mousetrap',
        root: 'mousetrap' // indicates global variable
      },
      'angular-modal-gallery' : {
        commonjs: 'angular-modal-gallery',
        commonjs2: 'angular-modal-gallery',
        amd: 'angular-modal-gallery',
        root: 'angular-modal-gallery' // indicates global variable
      },
      '@types/xlsx' : {
        commonjs: '@types/xlsx',
        commonjs2: '@types/xlsx',
        amd: '@types/xlsx',
        root: '@types/xlsx' // indicates global variable
      },
      'xlsx' : {
        commonjs: 'xlsx',
        commonjs2: 'xlsx',
        amd: 'xlsx',
        root: 'xlsx' // indicates global variable
      },
      'file-saver' : {
        commonjs: 'file-saver',
        commonjs2: 'file-saver',
        amd: 'file-saver',
        root: 'file-saver' // indicates global variable
      }
    }
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.json'
            }
          },
          {
            loader: 'angular2-template-loader'
          }
        ],
        exclude: [
          /node_modules/,
          /\.(spec|e2e)\.ts$/
        ]
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      },

      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },

      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader']
      },

      {
        test: /\.html$/,
        use: 'raw-loader'
      },

      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]

  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /\@angular\b.*\b(bundles|linker)/,
      path.join(__dirname, './src')
    ),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, './src')
    ),
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)esm5/,
      path.join(__dirname, './src')
    ),

    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true
    }),

    new webpack.BannerPlugin({
      banner: `
/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @author ${pkg.author.name}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 */
      `.trim(),
      raw: true,
      entryOnly: true
    })

  ]
} as webpack.Configuration;
