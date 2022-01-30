<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" class="text-center">
      <p class="display-1 py-12">プロフィール</p>
      <v-row>
        <v-col cols="12" md="4">
          <v-avatar :color="profile.themeColor" size="72">
            <span class="white--text body-2" v-text="profile.nickname" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="画像を選択してください"
            prepend-icon="photo_camera"
            label="アバター"
            @change="saveFileContent"
          />
        </v-col>
      </v-row>
      <label class="v-label theme--light">テーマカラー*</label>
      <v-color-picker
        v-model="newThemeColor"
        class="mx-auto mb-4 mt-2"
        hide-canvas
        show-swatches
        swatches-max-height="120px"
      />
      <v-btn small rounded color="primary" @click="saveThemeColor">
        テーマカラーを決定する
      </v-btn>
      <v-text-field
        v-model="profile.userName"
        readonly
        label="ユーザー名*"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editUserName"
      />
      <v-dialog
        v-model="isOpenEditUserNameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field v-model="newUserName" label="ユーザー名*" />
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeEditUserNameDialog">
              キャンセル
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveUserName">
              保存する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.nickname"
        readonly
        label="ニックネーム*"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editNickname"
      />
      <v-dialog
        v-model="isOpenEditNicknameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field v-model="newNickname" label="ニックネーム*" />
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeEditNicknameDialog">
              キャンセル
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveNickname">
              保存する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.mailAddress"
        readonly
        label="メールアドレス"
      />
      <small class="float-left">*必須フィールドを示します</small>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  profileStore,
  updateNickname,
  updateThemeColor,
  updateUserName,
} from '@/store/profile';
import { defineComponent, reactive, toRefs } from '@vue/composition-api';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
export default defineComponent({
  setup() {
    const state = reactive({
      profile: profileStore.profile!,
      newUserName: null as string | null,
      newNickname: null as string | null,
      newThemeColor: profileStore.profile!.themeColor,
      isOpenEditUserNameDialog: false,
      isOpenEditNicknameDialog: false,
    });

    /**
     * アバター画像を保存する
     * @param file アバター画像ファイル
     */
    const saveFileContent = (file: File) => {};

    /**
     * テーマカラーを保存
     */
    const saveThemeColor = () => {
      updateThemeColor(state.newThemeColor);
    };

    /**
     * ユーザ名編集の開始
     */
    const editUserName = () => {
      state.newUserName = state.profile!.userName;
      state.isOpenEditUserNameDialog = true;
    };

    /**
     * ユーザ名の編集を終了
     */
    const closeEditUserNameDialog = () => {
      state.isOpenEditUserNameDialog = false;
    };

    /**
     * ユーザ名を保存
     */
    const saveUserName = () => {
      if (state.newUserName) {
        updateUserName(state.newUserName);
      }
      state.isOpenEditUserNameDialog = false;
    };

    /**
     * ニックネームの編集を開始
     */
    const editNickname = () => {
      state.newUserName = state.profile!.nickName;
      state.isOpenEditNicknameDialog = true;
    };

    /**
     * ニックネームの編集を終了
     */
    const closeEditNicknameDialog = () => {
      state.isOpenEditNicknameDialog = false;
    };

    /**
     * ニックネームを保存
     */
    const saveNickname = () => {
      if (state.newNickname) {
        updateNickname(state.newNickname);
      }
      state.isOpenEditNicknameDialog = false;
    };

    return {
      ...toRefs(state),
      saveFileContent,
      saveThemeColor,
      editUserName,
      closeEditUserNameDialog,
      saveUserName,
      editNickname,
      closeEditNicknameDialog,
      saveNickname,
    };
  },
});
</script>
