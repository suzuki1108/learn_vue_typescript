/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Profile } from '@/store/profile.model';
import '@/plugins/composition-api';
import { reactive } from '@vue/composition-api';
import { update } from './shared-user';

export const profileMockData: Profile = {
  userId: '66006b29-727e-4ed8-a3c8-95d4438f66d4',
  userName: 'naminami',
  nickName: '波平',
  themeColor: '#4caf50',
  hasAvatar: false,
  mailAddress: 'namihei@example.com',
};

export const profileStore = reactive({ profile: null as Profile | null });

/**
 * ユーザ名を更新
 */
export const updateUserName = (userName: string): void => {
  profileStore.profile!.userName = userName;
  update(profileStore.profile!);
};

/**
 * ニックネームを更新
 */
export const updateNickname = (nickname: string): void => {
  profileStore.profile!.nickname = nickname;
  update(profileStore.profile!);
};

export const updateThemeColor = (themeColor: string): void => {
  profileStore.profile!.themeColor = themeColor;
  update(profileStore.profile!);
};
