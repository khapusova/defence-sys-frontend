/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  INITIAL_STATE,
  PENDING_STATE,
  REJECTED_STATE,
  FULFILLED_STATE,
  STORE_NAMES,
  LOCALSTORAGE
} from '@constants';
import text from '@text';
import storage from 'redux-persist/lib/storage';
import { api } from './api';
import { setDataToLS } from '../localStorage';

const { AUTHORIZATION } = STORE_NAMES;

const initiatUser = {
  userName: null,
  userSurname: null,
  country: null,
  institution: null,
  about: null,
  avatarUri: null,
  token: null,
  passedOnboarding: null
};

const initialState = {
  ...INITIAL_STATE,
  userInfo: initiatUser
};

const loginThunkName = `${AUTHORIZATION}/login`;
const getActualUserInfoThunkName = `${AUTHORIZATION}/getActualUserInfo`;
const setUserSettingsThunkName = `${AUTHORIZATION}/setUserSettings`;
const addNewAuthorThunkName = `${AUTHORIZATION}/addNewAuthor`;
const setUserDataThunkName = `${AUTHORIZATION}/setUserData`;
const interactWithSubcriptionThunkName = `${AUTHORIZATION}/interactWithSubcription`;
const setPassedOnboardingThunkName = `${AUTHORIZATION}/setPassedOnboarding`;
const changePasswordThunkName = `${AUTHORIZATION}/changePassword`;
const changeEmailThunkName = `${AUTHORIZATION}/changeEmail`;

export const setPassedOnboarding = createAsyncThunk(
  setPassedOnboardingThunkName,
  async (body, { rejectWithValue }) => {
    const response = await api.getUserById(body);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    if (Object.keys(response).length === 0) {
      return rejectWithValue({
        errorMessage: 'No user with selected token'
      });
    }

    const newUserInfo = { ...response, passedOnboarding: true };

    await api.setUserSettings(newUserInfo);

    return newUserInfo;
  }
);
export const interactWithSubcription = createAsyncThunk(
  interactWithSubcriptionThunkName,
  async (body, { rejectWithValue }) => {
    const response = await api.getUserById(body);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    if (Object.keys(response).length === 0) {
      return rejectWithValue({
        errorMessage: 'No user with selected token'
      });
    }

    const newUserFollowing =
      body.action === 'unfollow'
        ? response.following.filter(
            (fol) =>
              fol.id !== body.followingObject.id &&
              body.followingObject.type_of_following !== fol.type_of_following
          )
        : [...response.following, body.followingObject];

    const newUserInfo = {
      ...response,
      following: newUserFollowing
    };
    await api.setUserSettings(newUserInfo);

    return newUserInfo;
  }
);

export const changeEmail = createAsyncThunk(
  changeEmailThunkName,
  async (body, { rejectWithValue }) => {
    const loginData = await api.login(body);
    if (loginData.error) {
      return rejectWithValue(loginData.error);
    }

    const [foundUser] = loginData.data.filter((el) => el.token === body.token);
    if (!foundUser) {
      return rejectWithValue('There is no user with setted token');
    }
    const newUser = { ...foundUser, email: body.email };
    const newLoginArray = loginData.data.map((el) => {
      if (el.token === body.token) {
        return newUser;
      }
      return el;
    });

    const newLoginData = {
      ...loginData,
      data: newLoginArray
    };

    api.addNewLoginUser(newLoginData);

    return newLoginData;
  }
);

export const changePassword = createAsyncThunk(
  changePasswordThunkName,
  async (body, { rejectWithValue }) => {
    const loginData = await api.login(body);
    if (loginData.error) {
      return rejectWithValue(loginData.error);
    }

    const [foundUser] = loginData.data.filter((el) => el.token === body.token);
    if (!foundUser) {
      return rejectWithValue('There is no user with setted token');
    }
    const newUser = { ...foundUser, password: body.password };
    const newLoginArray = loginData.data.map((el) => {
      if (el.token === body.token) {
        return newUser;
      }
      return el;
    });

    const newLoginData = {
      ...loginData,
      data: newLoginArray
    };

    api.addNewLoginUser(newLoginData);

    return newLoginData;
  }
);

export const addNewAuthor = createAsyncThunk(
  addNewAuthorThunkName,
  async (body, { rejectWithValue }) => {
    const allAuthors = await api.getAllAuthors(body);

    if (allAuthors.error) {
      return rejectWithValue(allAuthors.error);
    }

    if (allAuthors.length === 0) {
      return rejectWithValue({
        errorMessage: 'No authors'
      });
    }
    const loginData = await api.login(body);
    if (loginData.error) {
      return rejectWithValue(loginData.error);
    }

    const id =
      Math.max.apply(
        null,
        allAuthors.map((el) => el.id)
      ) + 1;

    const newAuthor = {
      id,
      userName: body.firstName,
      userSurname: body.lastName,
      followers: 0,
      following: 0
    };

    const newLoginUser = {
      token: `user${id}`,
      email: body.emailInstitution,
      password: body.password
    };

    const newLoginData = {
      ...loginData,
      data: [...loginData.data, newLoginUser]
    };

    await api.addNewAuthor(newAuthor);
    await api.addNewLoginUser(newLoginData);
  }
);

export const login = createAsyncThunk(
  loginThunkName,
  async (body, { rejectWithValue }) => {
    const response = await api.login(body);
    if (response.error) {
      return rejectWithValue(response.error);
    }
    const [matchedUser] = response.data.filter(
      (user) => user.email === body.email && user.password === body.password
    );

    if (!matchedUser) {
      return rejectWithValue({
        errorMessage: text.errorMessages.emailOrPasswordIsIncorrect
      });
    }

    setDataToLS(LOCALSTORAGE.activeUser, { token: matchedUser.token });
    return matchedUser;
  }
);

export const getActualUserInfo = createAsyncThunk(
  getActualUserInfoThunkName,
  async (body, { rejectWithValue }) => {
    const response = await api.getUserById(body);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    if (Object.keys(response).length === 0) {
      return rejectWithValue({
        errorMessage: 'No user with selected token'
      });
    }

    return response;
  }
);

export const setUserSettings = createAsyncThunk(
  setUserSettingsThunkName,
  async (body, { rejectWithValue }) => {
    const response = await api.getUserById(body);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    if (Object.keys(response).length === 0) {
      return rejectWithValue({
        errorMessage: 'No user with selected token'
      });
    }

    const userInfoWithSettings = { ...response, ...body.settings };

    await api.setUserSettings(userInfoWithSettings);

    return userInfoWithSettings;
  }
);

export const setUserData = createAsyncThunk(
  setUserDataThunkName,
  async (body, { rejectWithValue }) => {
    const response = await api.getUserById(body);

    if (response.error) {
      return rejectWithValue(response.error);
    }

    if (Object.keys(response).length === 0) {
      return rejectWithValue({
        errorMessage: 'No user with selected token'
      });
    }

    const userInfoWithSettings = { ...response, ...body };

    await api.setUserSettings(userInfoWithSettings);

    return userInfoWithSettings;
  }
);

const authorizationSlice = createSlice({
  name: AUTHORIZATION,
  initialState,
  reducers: {
    resetState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          login.pending,
          getActualUserInfo.pending,
          setUserSettings.pending,
          setUserData.pending,
          addNewAuthor.pending,
          interactWithSubcription.pending,
          setPassedOnboarding.pending,
          changePassword.pending,
          changeEmail.pending
        ),
        (state) => {
          if (!state.isPending) {
            return {
              ...state,
              ...PENDING_STATE
            };
          }
        }
      )
      .addMatcher(
        isAnyOf(
          login.rejected,
          getActualUserInfo.rejected,
          setUserSettings.rejected,
          addNewAuthor.rejected,
          interactWithSubcription.rejected,
          setUserData.rejected,
          setPassedOnboarding.rejected,
          changePassword.rejected,
          changeEmail.rejected
        ),
        (state) => {
          if (state.isPending) {
            const newState = {
              ...state,
              ...REJECTED_STATE
            };
            return newState;
          }
          return state;
        }
      )
      .addMatcher(
        isAnyOf(
          login.fulfilled,
          getActualUserInfo.fulfilled,
          setUserSettings.fulfilled,
          interactWithSubcription.fulfilled,
          setUserData.fulfilled,
          setPassedOnboarding.fulfilled
        ),
        (state, { payload }) => ({
          ...state,
          userInfo: { ...initiatUser, ...payload },
          ...FULFILLED_STATE
        })
      )
      .addMatcher(
        isAnyOf(
          addNewAuthor.fulfilled,
          changePassword.fulfilled,
          changeEmail.fulfilled
        ),
        (state) => state
      );
  }
});

const authorizationPersistConfig = {
  key: AUTHORIZATION,
  storage
};

const { actions: authorizationActions, reducer: authorizationReducer } =
  authorizationSlice;
export {
  authorizationActions,
  authorizationReducer,
  authorizationPersistConfig
};
