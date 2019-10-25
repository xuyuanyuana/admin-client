/* localStorage的封装 
  使用store库实现封装
*/
import storage from 'store'

// 获取指定可以的local值
function get(key) {
  return storage.get(key)  
}

// 设置local，必须传默认值
function set(key,defaultValue) {
  if(defaultValue === undefined){
    throw new Error('必须带默认值')
  }
  storage.set(key,defaultValue)
}

// 移出指定key的local
function remove(key) {
  if(key){
    storage.remove(key)
  }else{
    storage.clearAll()
  }
}

export default {
  get,
  set,
  remove
}