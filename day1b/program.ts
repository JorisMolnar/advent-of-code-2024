import { countBy, flatten, flow, map, pickBy, range, sortBy, split, sum, thru, toNumber, toPairs, zip } from 'lodash/fp'
import { log, transpose } from '../utils/fp'
import { performance } from 'perf_hooks'
import { Dictionary } from 'lodash'

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

    let similarity = 0
    for (const [num, countA] of Object.entries(lines[0])) {
      const countB = lines[1][num] ?? 0
      similarity += countA * countB * toNumber(num)
    }

    return similarity
  }
}

const parseInput: (input: string) => Array<Dictionary<number>> = flow(
  split('\n'),
  map(flow(
    split('   '),
    map(toNumber)
  )),
  transpose,
  map(countBy(x => x))
)
