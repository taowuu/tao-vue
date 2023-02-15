import { reactive } from '../reactive'
import { effect } from '../effect'

describe('effect', () => {
  // 核心测试
  it('happy path', () => {
    const user = reactive({
      age: 10,
    })

    let nextAge
    // 收集依赖
    effect(() => {
      nextAge = user.age + 1
    })

    expect(nextAge).toBe(11)
    // 触发依赖
    user.age++
    expect(nextAge).toBe(12)
  })
  // 测试 effect 返回 runner
  // runner 调用继续触发依赖
  it('should return runner when call effect', () => {
    let foo = 10
    const runner = effect(() => {
      foo++
      return 'foo'
    })

    expect(foo).toBe(11)

    const r = runner()

    expect(r).toBe('foo')
    expect(foo).toBe(12)
  })
})
