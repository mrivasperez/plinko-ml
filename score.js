// const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  console.log(outputs);
}

function runAnalysis() {
  // Write code here to analyze stuff
}

// [drop point, bounciness, size, bucketLable][]
const outputs = [
  [10, 0.5, 16, 1],
  [200, 0.5, 16, 4],
  [350, 0.5, 16, 4],
  [600, 0.5, 16, 5]
];

// the drop point one is predicting for
const predictionDroppoint = 300;

// the k value - how many "neighbors" will be checked
const kPoint = 3;

// calculate the distance from the droppoint to the 'predictionDroppoint'
const distanceFromPredictionDroppoint = (point) => {
  return Math.abs(point - predictionDroppoint);
};

_.chain(outputs)
  // map through the results to create a new array: [dropPoint, bucket][]
  .map((result) => [distanceFromPredictionDroppoint(result[0], result[3])])
  // sort the array by distance from prediction droppoint
  .sortBy((row) => row[0])
  // slice the sorted array up to the kPoint (nearest neighbors to consider)
  .slice(0, kPoint);
