export function mergeDelta(delta, setDelta, modifs) {
    // mise à jour de delta
    setDelta(Object.assign({ ...delta }, modifs));
}
