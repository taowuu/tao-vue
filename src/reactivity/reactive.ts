import { track } from './effect'
import { trigger } from './effect'

function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
    if(!isReadonly) {
      // 依赖收集
      track(target, key)
    }
    return res
  }
}

export function reactive(raw) {
  return new Proxy(raw, {
    // get(target, key) {
    //   const res = Reflect.get(target, key)
    //   // 依赖收集
    //   track(target, key)
    //   return res
    // },
    get: createGetter(),

    set(target, key, value) {
      const res = Reflect.set(target, key, value)
      // 触发依赖
      trigger(target, key)
      return res
    }
  })
}

export function readonly(raw) {
  return new Proxy(raw, {
    // get(target, key) {
    //   const res = Reflect.get(target, key)
    //   return res
    // },
    get: createGetter(true),

    set(target, key, value) {
      return true
    }
  })
}