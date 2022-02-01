/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Profile } from '@/store/profile.model';
import '@/plugins/composition-api';
import { reactive } from '@vue/composition-api';
import { update } from './shared-user';
import axios from 'axios';

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

export const signInAsync = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get<Profile>('profile');
    profileStore.profile = response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * ユーザ名を更新
 * @param userName
 */
export const updateUserNameAsync = async (userName: string) => {
  const profile = profileStore.profile!;
  const data = { userName: userName };
  // eslint-disable-next-line no-useless-catch
  try {
    await axios.patch('profile', data);
    update(profile);
  } catch (error) {
    throw error;
  }
};
