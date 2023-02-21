import { extend } from "../shared"

class ReactiveEffect {
  private _fn: any
  deps = []
  active =  true
  onStop?: () => void
  public scheduler: Function | undefined
  // scheduler 提供给外部获取
  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }
  
  run() {
    // 记录当前的依赖
    activeEffect = this
    // 提供 ruuner 的返回值
    return this._fn()
  }

  stop() {
    // 停止 track 中收集的依赖
    // 防止多次 stop
    if(this.active) {
      cleanupEffect(this)
      // onStop 回调
      if(this.onStop) {
        this.onStop()
      }
      this.active = false
    }
    
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
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

  // 只是 get 导致 activeEffect undefined
  if(!activeEffect) return

  // 收集依赖
  dep.add(activeEffect)         
  // 收集当前 effect 要停止的依赖
  activeEffect.deps.push(dep)
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

// 保存当前的 effect
let activeEffect

export function effect(fn, options: any = {}) {
  // 触发依赖时执行 scheduler
  const scheduler = options.scheduler
  const _effect = new ReactiveEffect(fn, scheduler)
  
  // _effect.onStop = options.onStop
  // 优雅赋值多个 option
  // Object.assign(_effect, options)
  extend(_effect, options)
  
  // fn() 在内部立即调用
  _effect.run()
  
  // 给 runner 挂上所控制的依赖 
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  
  // 暴露 runner 给外部
  // 保证 runner 调用者是当前触发的依赖
  return runner
}

// 停止触发依赖
export function stop(runner) {
  // 停止对应的依赖触发
  runner.effect.stop()
}