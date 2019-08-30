const USER = 'user'

// 获取localStorage存储的user数据
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER))
}
// 存入localStorage的user数据
export const setUser = (data) => {
  window.localStorage.setItem(USER, JSON.stringify(data))
}
// 删除localStorage的user数据
export const deleteUser = () => {
  window.localStorage.removeItem(USER)
}
