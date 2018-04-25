import * as tf from "@tensorflow/tfjs";

/*
 * Tensors
 */
// The primary Tensor constructor is the tf.tensor function:

// 2x3 Tensor
const shape: number[] = [2, 3]; // 2 rows, 3 columns
const aTensor: tf.Tensor = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
aTensor.print(); // print Tensor values
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]

// The shape can also be inferred:
const bTensor: tf.Tensor = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
bTensor.print();
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]

// The following example creates an identical tensor to the one above using tf.tensor2d:
const cTensor: tf.Tensor2D = tf.tensor2d([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
cTensor.print();
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]

// TensorFlow.js also provides convenience functions for creating tensors with all
// values set to 0 (tf.zeros) or all values set to 1 (tf.ones):

// 3x5 Tensor with all values set to 0
const zeros: tf.Tensor = tf.zeros([3, 5]);
zeros.print();
// Output: [[0, 0, 0, 0, 0],
//          [0, 0, 0, 0, 0],
//          [0, 0, 0, 0, 0]]

/*
 * Variables
 */
// Variables are initialized with a tensor of values. Unlike Tensors, however, their values
// are mutable. You can assign a new tensor to an existing variable using the assign method:
const initialValues: tf.Tensor = tf.zeros([5]);
const biases: tf.Variable = tf.variable(initialValues); // initialize biases
biases.print(); // output: [0, 0, 0, 0, 0]

const updatedValues: tf.Tensor = tf.tensor1d([0, 1, 0, 1, 0]);
biases.assign(updatedValues); // update values of biases
biases.print(); // output: [0, 1, 0, 1, 0]

/*
 * Operations (Ops)
 */
// Available ops include unary ops such as square:
const d: tf.Tensor2D = tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
const dSquared: tf.Tensor2D = d.square();
dSquared.print();
// Output: [[1, 4 ],
//          [9, 16]]

// And binary ops such as add, sub, and mul:
const e: tf.Tensor2D = tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
const f: tf.Tensor2D = tf.tensor2d([[5.0, 6.0], [7.0, 8.0]]);

const ePlusF: tf.Tensor2D = e.add(f);
ePlusF.print();
// Output: [[6 , 8 ],
//          [10, 12]]

// TensorFlow.js has a chainable API; you can call ops on the result of ops:
const sqSum: tf.Tensor = e.add(f).square();
sqSum.print();
// Output: [[36 , 64 ],
//          [100, 144]]

// All operations are also exposed as functions in the main namespace,
// so you could also do the following:
const sqSum2 = tf.square(tf.add(e, f));

/*
 * Models and Layers
 */

// In TensorFlow.js there are two ways to create models. You can use ops directly to represent the work the model does.
// Define function
function predict(input) {
  // y = a * x ^ 2 + b * x + c
  // More on tf.tidy in the next section
  return tf.tidy(() => {
    const x = tf.scalar(input);

    const ax2 = a.mul(x.square());
    const bx = b.mul(x);
    const y = ax2.add(bx).add(c);

    return y;
  });
}

// Define constants: y = 2x^2 + 4x + 8
const a: tf.Tensor = tf.scalar(2);
const b: tf.Tensor = tf.scalar(4);
const c: tf.Tensor = tf.scalar(8);

// Predict output for input of 2
const result: tf.Tensor = predict(2);
result.print(); // Output: 24

// You can also use the high-level API tf.model to construct a model out of layers,
// which are a popular abstraction in deep learning.
const model: tf.Sequential = tf.sequential();
model.add(
  tf.layers.simpleRNN({
    inputShape: [80, 4],
    recurrentInitializer: "GlorotNormal",
    units: 20,
  }),
);

/*
const optimizer = tf.train.sgd(LEARNING_RATE);
model.compile({optimizer, loss: "categoricalCrossentropy"});
model.fit({x: aTensor, y: bTensor});
*/

/*
 * Memory Management: dispose and tf.tidy
 */
// You can call dispose on a tensor or variable to purge it and free up its GPU memory:
const xTensor: tf.Tensor2D = tf.tensor2d([[0.0, 2.0], [4.0, 6.0]]);
const xSquared: tf.Tensor2D = xTensor.square();

xTensor.dispose();
xSquared.dispose();

// tf.tidy executes a function and purges any intermediate tensors created,
// freeing up their GPU memory. It does not purge the return value of the inner function.
// tf.tidy takes a function to tidy up after
const average: tf.Tensor = tf.tidy(() => {
  // tf.tidy will clean up all the GPU memory used by tensors inside
  // this function, other than the tensor that is returned.
  //
  // Even in a short sequence of operations like the one below, a number
  // of intermediate tensors get created. So it is a good practice to
  // put your math ops in a tidy!
  const y = tf.tensor1d([1.0, 2.0, 3.0, 4.0]);
  const z = tf.ones([4]);

  return y.sub(z).square().mean();
});

average.print(); // Output: 3.5
