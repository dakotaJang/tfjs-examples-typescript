import * as tf from '@tensorflow/tfjs';
import { default as renderChart, VisualizationSpec } from 'vega-embed';

export async function plotData(container: string, xs: tf.Tensor, ys: tf.Tensor) {
  const xvals = await xs.data();
  const yvals = await ys.data();

  const values = Array.from(yvals).map((y, i) => {
    return {x: xvals[i], y: yvals[i]};
  });

  const spec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
    data: {values},
    encoding: {
      x: {field: 'x', type: 'quantitative'},
      y: {field: 'y', type: 'quantitative'},
    },
    height: 300,
    mark: 'point',
    width: 300,
  };

  return renderChart(container, spec, {actions: false});
}

export async function plotDataAndPredictions(container: string, xs: tf.Tensor, ys: tf.Tensor, preds: tf.Tensor) {
  const xvals = await xs.data();
  const yvals = await ys.data();
  const predVals = await preds.data();

  const values = Array.from(yvals).map((y, i) => {
    return {x: xvals[i], y: yvals[i], pred: predVals[i]};
  });

  const spec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
    data: {values},
    height: 300,
    layer: [
      {
        encoding: {
          x: {field: 'x', type: 'quantitative'},
          y: {field: 'y', type: 'quantitative'},
        },
        mark: 'point',
      },
      {
        encoding: {
          color: {value: 'tomato'},
          x: {field: 'x', type: 'quantitative'},
          y: {field: 'pred', type: 'quantitative'},
        },
        mark: 'line',
      },
    ],
    width: 300,
  };

  return renderChart(container, spec, {actions: false});
}

export function renderCoefficients(container: string, coeff: any) {
  document.querySelector(container).innerHTML =
      `<span>a=${coeff.a.toFixed(3)}, b=${coeff.b.toFixed(3)}, c=${
          coeff.c.toFixed(3)},  d=${coeff.d.toFixed(3)}</span>`;
}
