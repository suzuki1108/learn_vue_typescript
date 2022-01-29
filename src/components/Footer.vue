<template>
  <v-footer v-if="signInUser" app class="pa-0">
    <v-bottom-navigation grow dark>
      <v-btn class="my-auto" height="56" @click="routerPush('/')">
        <span>home</span>
        <v-icon large>home</v-icon>
      </v-btn>
      <v-btn class="my-auto" height="56" @click="routerPush('/calendar/day')">
        <span>daily</span>
        <v-icon large>view_day</v-icon>
      </v-btn>
      <v-btn class="my-auto" height="56" @click="routerPush('/calendar/week')">
        <span>weekly</span>
        <v-icon large>view_week</v-icon>
      </v-btn>
      <v-btn class="my-auto" height="56" @click="routerPush('/calendar/month')">
        <span>monthly</span>
        <v-icon large>event_note</v-icon>
      </v-btn>
      <v-menu top open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <div :class="$style.profile" class="py-1 px-1 text-center" v-on="on">
            <v-avatar :color="signInUser.themeColor">
              <span class="white--text body-2" v-text="signInUser.nickName" />
            </v-avatar>
          </div>
        </template>
        <v-card>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              link
              @click="routerPush(item.path)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn block @click="signOut">サインアウト</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-bottom-navigation>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { profileMockData } from '@/store/profile';
import { Profile } from '@/store/profile.model';

export default defineComponent({
  setup(prop, context) {
    interface Items {
      title: string;
      icon: string;
      path: string;
    }

    interface State {
      items: Items[];
      signInUser: Profile;
    }

    const state = reactive<State>({
      // サブメニューのアイテム
      items: [
        {
          title: 'プロフィール',
          icon: 'account_circle',
          path: '/profile',
        },
        { title: '共有する', icon: 'share', path: '/share' },
      ],
      signInUser: profileMockData,
    });

    /**
     * 指定したパスに画面遷移を行う
     * @param {string} path 遷移先のパス
     */
    const routerPush = (path: string) => {
      context.root.$router.push(
        path,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
      );
    };

    const signOut = () => {
      routerPush('/sign-in');
    };

    return {
      ...toRefs(state),
      routerPush,
      signOut,
    };
  },
});
</script>

<style lang="scss" module>
.profile {
  cursor: pointer;
  width: 168px;
}
</style>
