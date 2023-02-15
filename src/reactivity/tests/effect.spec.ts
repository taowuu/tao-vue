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
  // 
  it("scheduler", () => {
    // 1. 通过 effect 第二个参数给定一个记时的 fn
    // 2. effect 调用执行 fn
    // 3. set 不执行 fn 而是执行 scheduler
    // 4. 执行 runner 时再次执行 fn
    let dummy
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    });
    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler }
    );
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    // should be called on first trigger
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    // // should not run yet
    expect(dummy).toBe(1)
    // // manually run
    run()
    // // should have run
    expect(dummy).toBe(2)
  });
})
