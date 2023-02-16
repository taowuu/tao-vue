class ReactiveEffect {
  private _fn: any
  // scheduler 提供给外部获取
  constructor(fn, public scheduler?) {
    this._fn = fn
  }
  
  run() {
    // 记录当前的依赖
    activeEffect = this
    // 提供 ruuner 的返回值
    return this._fn()
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
  // 触发依赖时执行 scheduler
  if(effect.scheduler) {
      effect.scheduler()
    } else {
      // 第一次执行 fn
      effect.run()
    }
  })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}

// 保存当前的依赖
let activeEffect

export function effect(fn, options: any = {}) {
  // 触发依赖时执行 scheduler
  const scheduler = options.scheduler
  const _effect = new ReactiveEffect(fn, scheduler)
  // fn() 在内部立即调用
  _effect.run()
  // 暴露 runner 给外部
  // 保证 runner 调用者是当前触发的依赖
  return _effect.run.bind(_effect) 
}
