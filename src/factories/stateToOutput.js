import { setPathValue } from '../helpers/objectPath'

export default function (statePath, outputPath) {
  console.warn('deprecation (cerebral-addons): please use copy() instead of stateToOutput()')
  if (!outputPath) {
    outputPath = statePath
  }

  return function stateToOutput ({ input, state, output }) {
    let value = state.get(statePath)
    if (typeof value.toJS === 'function') {
      value = value.toJS()
    } else if (Object.isFrozen(value)) {
      value = JSON.parse(JSON.stringify(value))
    }
    setPathValue(input, outputPath, value)
    output(input)
  }
}
