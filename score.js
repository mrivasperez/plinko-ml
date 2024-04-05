const outputs = [];
const kPoint = 3;
const predictionDroppoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // MAKE PREDICTION
  // map through the results to create a new array: [dropPoint, bucket][]
  // sort the array by distance from prediction droppoint
  // slice the sorted array up to the kPoint (nearest neighbors to consider)
  // count to identify the most common bucket
  // pair the key values as an array of arrays to use data easier [bucket, count]
  // sort by count so that the most recorded bucket is last
  // get the last array element
  // get the first element of that array to get prediction

  const bucket = _.chain(outputs)
    .map((result) => [distanceFromPredictionDroppoint(result[0]), result[3]])
    .sortBy((row) => row[0])
    .slice(0, kPoint)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();

  console.log(`I predict your ball will fall into ${bucket}`);
}

// calculate the distance from the droppoint to the 'predictionDroppoint'
const distanceFromPredictionDroppoint = (point) => {
  return Math.abs(point - predictionDroppoint);
};
