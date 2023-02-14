describe('effect', () => {
  // 核心测试
  it('happy path', () => {
    const user = reactive({
      age: 20,
    })

    let nextAge
    // 收集依赖
    effect(() => {
      nextAge = user.age++
    })

    expect(nextAge).toBe(11)
    // 触发依赖
    user.age++
    expect(nextAge).toBe(12)
  })
})
