class ReactiveEffect {
  private _fn: any
   
  constructor(fn) {
    this._fn = fn
  }
  
  run() {
    // 记录当前的依赖
    activeEffect = this
    this._fn()
  }
}

// 新建容器存放所有的 target
const targetMap = new Map()

// 依赖收集
export function track(target, key) {
  // 获取当前 target 的所有依赖
  let depsMap = targetMap.get(target)
  // 初始化
  if(!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  // 获取当前 key 的依赖
  let dep = depsMap.get(key)
  if(!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  // 收集依赖
  dep.add(activeEffect)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}

// 触发依赖
export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  dep.forEach(effect => {
    effect.run()
  })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}

// 保存当前的依赖
let activeEffect

export function effect(fn) {
  // fn() 在内部立即调用
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}
