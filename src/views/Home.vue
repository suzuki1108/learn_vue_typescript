<template>
  <div>
    <h1 @click="home">ホーム</h1>
    <p><router-link to="sign-in">サインイン</router-link></p>
    <p><button @click="calender">カレンダー</button></p>
    <p><button @click="profile">プロフィール</button></p>
    <p><button @click="share">共有</button></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup(props, context) {
    const home = () => {
      context.root.$router.push(
        '/',
        () => {
          console.log('succses');
        },
        () => {
          console.log('failure');
        },
      );
    };

    const calender = () => {
      context.root.$router.push({
        name: 'calender',
        params: { type: { hoge: 123, fuga: 'xyz' } },
      });
    };

    const profile = () => {
      context.root.$router.push('profile');
    };

    const share = () => {
      context.root.$router.push('share');
    };

    return {
      home,
      calender,
      profile,
      share,
    };
  },
});
</script>
