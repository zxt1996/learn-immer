## immutable -> 不可变数据
- immutable: 去除引用数据类型副作用的数据的概念。每当我们创建一个被 deepClone 过的数据，新的数据进行有副作用 (side effect) 的操作都不会影响到之前的数据。 

## Proxy  
immer的内部是通过proxy来监听处理数据的  

![](readmeImg/proxy.png)    

Proxy 只能监听到当前层的属性访问，所以代理关系也要按需创建  

根节点预先创建一个 Proxy，对象树上被访问到的所有中间节点（或新增子树的根节点）都要创建对应的 Proxy。  

而每个 Proxy 都只在监听到写操作（直接赋值、原生数据操作 API 等）时才创建拷贝值（所谓Copy-on-write），并将之后的写操作全都代理到拷贝值上。  

最后，将这些拷贝值与原值整合起来，得到数据操作结果。  

> Immer = Copy-on-write + Proxy