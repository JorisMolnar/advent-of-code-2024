import { countBy, every, flatten, flow, map, pickBy, range, reverse, some, split, sum, thru, toNumber, toPairs } from 'lodash/fp'
import { log, window } from '../utils/fp'
import { performance } from 'perf_hooks'
import { combinations } from 'combinatorial-generators'

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

    return countSafe(lines)
  }
}

const isSafe: (input: number[]) => boolean = flow(
  x => x[0] < x[x.length - 1] ? x : reverse(x),
  window(2),
  every(([a, b]) => (b - a >= 1) && (b - a <= 3))
)

const problemDampener: (input: number[]) => number[][] = x => [...combinations(x, x.length - 1)]

const countSafe: (input: number[][]) => number = flow(
  map(x => isSafe(x) || problemDampener(x).some(isSafe)),
  sum
)

/** Split input to a list of lines */
const parseInput: (input: string) => number[][] = flow(
  split('\n'),
  map(flow(
    split(' '),
    map(toNumber)
  ))
)
