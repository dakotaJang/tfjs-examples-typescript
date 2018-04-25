# Training First Steps: Fitting a Curve to Synthetic Data

Details found in https://js.tensorflow.org/tutorials/fit-curve.html

Based on https://github.com/tensorflow/tfjs-examples/tree/master/polynomial-regression-core

## Changes
In `ui.plotDataAndPredictions` changed the encoding of VisualizationSpec:
From:
```
type: 'ordinal'
```
To:
```
type: 'quantitative'
```
