# Training on Images: Recognizing Handwritten Digits with a Convolutional Neural Network

Details found in https://js.tensorflow.org/tutorials/mnist.html

Based on https://github.com/tensorflow/tfjs-examples/tree/master/mnist

### Changes
Use local assets incase the online resource change in the future.

`src/data.ts`
```ts
const MNIST_IMAGES_SPRITE_PATH = '/assets/mnist_images.png';
const MNIST_LABELS_PATH = '/assets/mnist_labels_uint8';
```

Added private properties for `MnistData` class (for typescript)
```ts
export class MnistData {
  private shuffledTrainIndex: number;
  private shuffledTestIndex: number;
  private datasetImages: Float32Array;
  private datasetLabels: Uint8Array;
  private trainIndices: Uint32Array;
  private testIndices: Uint32Array;
  private trainImages: Float32Array;
  private testImages: Float32Array;
  private trainLabels: Uint8Array;
  private testLabels: Uint8Array;
```

