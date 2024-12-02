import { countBy, flatten, flow, map, pickBy, range, sortBy, split, sum, thru, toNumber, toPairs, zip } from 'lodash/fp'
import { log, transpose } from '../utils/fp'
import { performance } from 'perf_hooks'

export class Program {
  main (input: string): void {
    const t0 = performance.now()
    const result = this.calcResult(input)
    const t1 = performance.now()
    console.log(`Calc took ${t1 - t0} milliseconds.`)
    console.log('Answer:', result)
  }

  private calcResult (input: string): number {
    const lines = parseInput(input)
    const result = sumDiffs(lines)

    return result
  }
}

const sumDiffs: (input: number[][]) => number = flow(
  map(x => Math.abs(x[0] - x[1])),
  sum
)

const parseInput: (input: string) => number[][] = flow(
  split('\n'),
  map(split('   ')),
  transpose,
  map(flow(
    map(toNumber),
    sortBy(x => x)
  )),
  transpose
)
