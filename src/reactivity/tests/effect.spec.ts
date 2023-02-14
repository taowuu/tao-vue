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
})
