import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeComponent from '@/views/Home.vue';
import CalendarComponent from '@/views/Calendar.vue';
import ProfileComponent from '@/views/Profile.vue';
import ShareComponent from '@/views/Share.vue';
import SignInComponent from '@/views/SignIn.vue';
import NotFoundComponent from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
    meta: {
      title: 'home',
    },
  },
  {
    path: '/calendar/:type',
    name: 'calendar',
    component: CalendarComponent,
    props: true,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent,
  },
  {
    path: '/share',
    name: 'share',
    component: ShareComponent,
  },
  {
    path: '/sign-in',
    name: 'sing-in',
    component: SignInComponent,
  },
  {
    path: '*',
    component: NotFoundComponent,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  if (!to.meta.title) {
    return;
  }

  document.title = to.meta.title;
});

export default router;
