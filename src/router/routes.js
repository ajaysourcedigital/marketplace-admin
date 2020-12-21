
const routes = [
  // Logged-in routes...
  {
    path: '/',
    component: () => import('layouts/Simple.vue'),
    props: true,
    meta: { requiresLogin: true },
    children: [
      { name: 'home', path: '', component: () => import('pages/Home.vue') },
      { name: 'content', path: '/content', component: () => import('pages/Content.vue') },
      { name: 'metacontent', path: '/metacontent', component: () => import('pages/Metacontent.vue') },
      { name: 'campaigns', path: '/campaigns', component: () => import('pages/Campaigns.vue') },
      { name: 'account', path: '/account', component: () => import('pages/Account.vue') },
      { name: 'team', path: '/team', component: () => import('pages/Team.vue') },
      { name: 'inviteTeam', path: '/invite-team', component: () => import('pages/InviteTeam.vue') },
      { name: 'live', path: '/live', component: () => import('pages/Live.vue') },
      { name: 'messages', path: '/messages', component: () => import('pages/Messages.vue') },
      { name: 'updates', path: '/updates', component: () => import('pages/Updates.vue') },
      { name: 'edit-campaign', path: '/edit-content/:id', component: () => import('pages/EditContent.vue') },
      { name: 'edit-content', path: '/edit-content/:id', component: () => import('pages/EditContent.vue') },
      { name: 'edit-metacontent', path: '/edit-metacontent/:id', component: () => import('pages/EditMetacontent.vue') }
    ]
  },
  // Public routes...
  {
    path: '/',
    component: () => import('layouts/Nothing.vue'),
    children: [
      { name: 'loading', path: '/loading', component: () => import('pages/Loading.vue') },
      { name: 'login', path: '/login', component: () => import('pages/Login.vue') },
      { name: 'lock', path: '/lock', component: () => import('pages/Lock.vue') }
    ]
  },
  // Everything else...
  {
    path: '*',
    component: () => import('layouts/Simple.vue'),
    children: [
      { name: 'notFound', path: '/not-found', component: () => import('pages/NotFound.vue') }
    ]
  }
]

export default routes
