# Getting started
Based on https://js.tensorflow.org/#getting-started

In this branch you will find an example of using Tensorflow.js with typescript.

## Prerequisite
- node
- npm

You can clone this repository and get started right away.
```
git clone https://github.com/dakotaJang/tfjs-examples-typescript/tree/0-Getting-Started

cd 0-Getting-Started

npm install

npm start
```

## Getting started from scratch

Create a directory you want to work in and create `package.json` by using:
```
npm init
```

Install Tensorflow.js
```
npm install @tensorflow/tfjs
```

Install devDependencies
```
npm install --save-dev concurrently cpx http-server ts-loader typescript webpack webpack-cli
```

Create and configure `tsconfig.json`
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "moduleResolution": "node",
    "removeComments": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules/**/*"
  ]
}
```

Create and configure `webpack.config.js`
```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dev')
  }
};
```

Add/replace following script in `package.json` for starting your project
```json
"scripts": {
  "prestart": "mkdir dev || exit 0",
  "start": "concurrently \"webpack -d -w\" \"cpx index.html dev --watch\" \"http-server dev -o -c-1\""
},
```

Create and configure `tslint.json` (optional)
```json
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {},
    "rulesDirectory": []
}
```


Start writing your machine learning code using Tensorflow.js

Example `scr/index.ts` (entry point)
```ts
import * as tf from "@tensorflow/tfjs";

// Define a model for linear regression.
const model: tf.Sequential = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: "meanSquaredError", optimizer: "sgd"});

// Generate some synthetic data for training.
const xs: tf.Tensor2D = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys: tf.Tensor2D = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data.
model.fit(xs, ys).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:/
  const prediction: tf.Tensor = model.predict(tf.tensor2d([5], [1, 1])) as tf.Tensor;
  prediction.print();

  // show the value in the body
  const predictionData = prediction.dataSync();
  window.onload = () => {window.document.body.innerHTML = `<span>Prediction: ${predictionData}</span>`; };
});
```

Run your project
```
npm start
```
If you don't see what you expect on the browser, check/wait to see if the webpack have finnished packing your code and then refresh the browser.

