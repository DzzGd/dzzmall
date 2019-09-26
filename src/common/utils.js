// 防抖
export function debounce(func, delay = 50) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func()
    }, delay);
  };
}

// 节流
export function throttle(func, delay = 50) {
  let time = new Date()
  return function (...args) {
    let nowTime = new Date()
    if (nowTime - time < delay) {
      return
    }

    func.apply(this, args)
    time = new Date()
  }
}
export function formatDate(date, fmt) {
  // 获取年份
  // 并不确定几个y
  2019
  // yy -19 
  // y -9
  // yyy -019
  // yyyy -2019
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
// mmm-dd
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

function toTwo(str) {
  return str.length === 1 ? '0' + str : str
}