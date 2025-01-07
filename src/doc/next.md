## nextjs

### 1. 在nextjs中，如果跳转路由会分别在服务端客户端执行一次，一共两次。

- 这是正常的不是bug
- 在开发模式下，React（以及Next.js）可能会启用严格模式。严格模式会故意触发两次渲染和挂载过程，以帮助开发者检测副作用中的潜在问题。这里设置next.config.ts下的reactStrictMode为false可以关闭严格模式。

### nextjs开发注意事项
- 尽量不要在page顶部加上'use client'，这会导致整个页面都是客户端组件。可以尽量把'use client'放在低层级组件上。
- 

