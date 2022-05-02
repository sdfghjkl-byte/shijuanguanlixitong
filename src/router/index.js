import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

//这里的配置决定了App.vue里<router-view/>位置会展示什么内容
export default new Router({
  routes: [
    {
      // 测试接口
      path: '/test', //当用户访问http://localhost:8080/根目录也就是默认目录会被路由到HelloWorld组件，
      //这个组件的所有内容会被在App.vue里<router-view/>显示出来

      name: 'test',
      component: (resolve) => require(['../view/user/user-modify'], resolve)
    },
    {
      // 登录
      path: '/login',
      name: 'login',
      component: (resolve) => require(['../view/longin'], resolve)
    },
    {
      // 添加试题
      path:'/question/add',
      name: 'addQuestion',
      component: (resolve) => require(['../view/question/add-question'], resolve)
    },
    {
      // 题目列表 根
      path:'/',
      name: 'Questionlist',
      component: (resolve) => require(['../view/question/question-list'], resolve)
    },
    {
      // 题目修改
      path:'/question/modify/:id',
      name: 'questionModify',
      component: (resolve) => require(['../view/question/modify-question'], resolve)
    },
    {
      // 用户列表
      path:'/user/list',
      name:'userList',
      component: (resolve) => require(['../view/user/user-list'], resolve)
    },
    {
      // 试卷列表
      path:'/paper/list',
      name:'paperList',
      component: (resolve) => require(['../view/paper/paper-list'], resolve)
    },
    {
      // 试卷修改 详细信息
      path:'/paper/modifyDetail',
      name: 'paperModifyDetail',
      component: (resolve) => require(['../view/paper/paper-modify-detail'], resolve)
    },
    {
      // 试卷信息
      path: '/paper/message',
      name: 'paperMessage',
      component: (resolve) => require(['../view/paper/paper-manual-create'], resolve)
    },
    {
      // 试卷详情
      path: '/paper/detail',
      name: 'paperDetail',
      component: (resolve) => require(['../view/paper/paper-detail'], resolve)
    },
    {
      // 自动生成试卷
      path: '/paper/auto',
      name: 'paperAuto',
      component: (resolve) => require(['../view/paper/paper-auto-create'], resolve)
    },
  ]
})
