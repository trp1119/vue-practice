import  { h, render, patch } from './vdom'


// 1 实现虚拟 dom，虚拟 dom 是描述 dom 节点的树形对象
/**
 * <div id="wrapper" a=1>
 *  <span style="color: red">hello</span>
 *  zf
 * </div>
 */
// h 方法就是根据 dom 的属性，类型，孩子产生一个虚拟 dom
// let oldVnode = h('div', {id: 'wrapper', a: 1, key: 'xx', style: {backgroundColor: '#ff6600'}}, 
//               h('span', {style: {color: 'green'}}, 
//                 'hello'), 
//               'zf')

let oldVnode = h('div', {},
  h('li', {style: {background: 'red'}, key: 'A'}, 'A'),
  h('li', {style: {background: 'red'}, key: 'B'}, 'B'),
  h('li', {style: {background: 'red'}, key: 'C'}, 'C'),
  h('li', {style: {background: 'red'}, key: 'D'}, 'D'),
  // h('li', {style: {background: 'red'}, key: 'E'}, 'E'),
  // h('li', {style: {background: 'red'}, key: 'F'}, 'F'),
)

// 将虚拟节点转化为真实dom节点并插入到页面中
render(oldVnode, app)

// let newVnode = h('a', {}, 'hello world')

let newVnode = h('div', {},
h('li', {style: {background: 'red'}, key: 'G', id: "G1"}, 'G1'),
h('li', {style: {background: 'red'}, key: 'C', id: "C1"}, 'C1'),
h('li', {style: {background: 'red'}, key: 'A'}, 'A'),
  h('li', {style: {background: 'red'}, key: 'F', id: "F1"}, 'F1'),
  // h('li', {style: {background: 'red'}, key: 'E', id: "E1"}, 'E1'),
  
  
  // h('li', {style: {background: 'red'}, key: 'B', id: "B1"}, 'B1'),

  h('li', {style: {background: 'red'}, key: 'D', id: "D1"}, 'D1'),

  
)


setTimeout(() => {
  patch(oldVnode, newVnode)
}, 2000)

// {
//   type: 'div',
//   props: {
//     id: 'wrapper',
//     a: 1
//   },
//   children: [
//     {
//       type: 'span',
//       props: {
//         style: {
//           color: 'red'
//         }
//       },
//       children: [
//         {
//           type: '',
//           props: '',
//           children: [],
//           text: 'hello'
//         }
//       ]
//     },
//     {
//       type: '',
//       props: '',
//       children: [],
//       text: 'zf'
//     }
//   ]
// }