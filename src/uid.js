function autoInc(seed = 0) {
  return () => ++seed;
}

export default autoInc();
