/**
 * 
 * @param {*} vnode 用户写的虚拟节点
 * @param {*} container 要渲染到哪个容器中
 */
export function render (vnode, container) {
  let ele = createDomElementFromVnode(vnode) // 将虚拟节点转化为真实节点
  container.appendChild(ele)
}

/**
 * 通过虚拟对象创建真实dom元素
 */
function createDomElementFromVnode (vnode) {
  let { type, key, props, children, text } = vnode
  if (type) { // 标签
    vnode.domElement = document.createElement(type) // 建立虚拟 dom 节点和真实元素的一个关系，后面用来更新真实 dom
    updateProperties(vnode) // 根据当前虚拟节点属性更新真实元素
    // children 中放置的也是 一个个虚拟节点 vnode
    // 递归渲染子虚拟节点
    children.forEach(childVnode => {
      render(childVnode, vnode.domElement)
    })
  } else { // 文本
    vnode.domElement = document.createTextNode(text)
  }
  return vnode.domElement
}

// 后续比对会根据 老的属性 和 新的属性 重新更新节点
function updateProperties (newVnode, oldProps = {}) {
  let domElement = newVnode.domElement // 真实 dom 元素
  let newProps = newVnode.props || {} // 当前虚拟节点中的属性

  // 如果属性旧节点有新节点没有，说明这个属性被移除了
  for (let oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      domElement.removeAttribute(oldPropName, oldProps[oldPropName])
    }
  }
  let newStyleObj = newProps.style || {}
  let oldStyleObj = oldProps.style || {}
  // console.log(newStyleObj, oldStyleObj)
  for (let propName in oldStyleObj) {
    if (!newStyleObj[propName]) {
      domElement.style[propName] = ''
    }
  }


  // 如果旧节点没有新节点有，说明这个属性是新增的
  for (let newPropsName in newProps) {
    // @click 事件 采用 addEventListener
    if (newPropsName === 'style') {
      let styleObj = newProps.style
      for (let s in styleObj) {
        domElement.style[s] = styleObj[s]
      }
    } else {
      domElement.setAttribute(newPropsName, newProps[newPropsName])
    }
  }
}

export function patch (oldVnode, newVnode) {
  // 类型不同
  if (oldVnode.type !== newVnode.type) {
    return oldVnode.domElement.parentNode.replaceChild(createDomElementFromVnode(newVnode), oldVnode.domElement)
  }
  // 类型相同，文本不同
  if (oldVnode.text) {
    if (oldVnode.text !== newVnode.text) {
      return oldVnode.domElement.textContent = newVnode.text
    }
  }
  // 类型相同，标签不同
  let domElement = newVnode.domElement = oldVnode.domElement
  updateProperties(newVnode, oldVnode.props) // 根据最新的虚拟节点更新属性

  let oldChildren = oldVnode.children || [] // 老儿子
  let newChildren = newVnode.children || [] // 新儿子

  if (oldChildren.length > 0 && newChildren.length > 0) { // 1 老的有儿子，新的有儿子
    updateChildren(domElement, oldChildren, newChildren)
  } else if (oldChildren.length > 0) { // 2 老的有儿子，新的没儿子
    domElement.innerHTML = ''
  } else if (newChildren.length > 0) { // 3 老的没儿子，新的没儿子
    for (let i = 0; i < newChildren.length; i++) {
      domElement.appendChild(createDomElementFromVnode(newChildren[i])) // 拿到的是虚拟节点，需转换为真实节点
    }
  }
}

// diff 列表比对
function updateChildren (parent, oldChildren, newChildren) {

  let oldStartIndex = 0
  let oldStartVnode = oldChildren[0]
  let oldEndIndex = oldChildren.length - 1
  let oldEndVnode = oldChildren[oldEndIndex]
  let map = createMapByKeyToIndex(oldChildren) // {A: 0, B: 1, C: 2, D: 3}
  console.log('map', map)
  
  let newStartIndex = 0
  let newStartVnode = newChildren[0]
  let newEndIndex = newChildren.length - 1
  let newEndVnode = newChildren[newEndIndex]

  while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIndex]
    } else if (!oldEndVnode) {
      oldEndVnode = oldEndVnode[--oldEndIndex]
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode)
      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildren[--oldEndIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      patch(oldStartVnode, newEndVnode)
      parent.insertBefore(oldStartVnode.domElement, oldStartVnode.domElement.nextSiblings)
      oldStartVnode = oldChildren[++oldStartIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      patch(oldEndVnode, newStartVnode)
      parent.insertBefore(oldEndVnode.domElement, oldStartVnode.domElement)
      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else {
      // 暴力对比
      // 取新节点到老节点中查找是否存在，如果存在复用，不存在就创建插入
      let index = map[newStartVnode.key]
      if (index === null) {
        // 老队列中没有此项，向前添加
        parent.insertBefore(createDomElementFromVnode(newStartVnode), oldStartVnode.domElement)
      } else {
        let toMoveNode = oldChildren[index]
        patch(toMoveNode, newStartVnode)
        parent.insertBefore(toMoveNode.domElement, oldStartVnode.domElement)
        oldChildren[index] = undefined
      }
      newStartVnode = newChildren[++newStartIndex]
    }
  }
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldChildren[i]) {
        parent.removeChild(oldChildren[i].domElement)
      }
    }
  }
  // 有剩余
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      let beforeElement = newChildren[newEndIndex + 1] === null ? null : newChildren[newEndIndex + 1].domElement
      // 给 null 就是 appendChild
      parent.insertBefore(createDomElementFromVnode(newChildren[i]), beforeElement)
    }
  }
}

// 判断是否是同个节点
function isSameVnode (oldVnode, newVnode) {
  return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
}

// 创建节点map，形式 {key: i} 如 {a: 0, b: 1, c: 2, d: 3}
function createMapByKeyToIndex (oldChildren) {
  let map = {}
  for (let i = 0; i < oldChildren.length; i++) {
    let current = oldChildren[i]
    if (current.key) {
      map[current.key] = i
    }
  }
  return map
}