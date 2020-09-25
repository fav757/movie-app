function randomInRange(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


export default randomInRange;