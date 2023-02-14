import { 
    add,
} from '../index'
// 第一个测试
it('init', () => {
    expect(true).toBe(true)
})

it('add', () => {
    expect(add(1, 1)).toBe(2)
})
