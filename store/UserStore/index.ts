import { baseApi } from '@/services/baseApi';
import { toast } from 'sonner';
import { IMeResponse } from './type';
import { setUserStore } from './slice';
import { getFromTokenCookies } from '@/utils/getFromTokenCookie';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.mutation<IMeResponse, void>({
      query: () => {
        const token = getFromTokenCookies();
        console.log(token, 'anaana');
        return {
          url: '/user/me',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setUserStore({
              me_result: {
                userId: data.data._id,
              },
            }),
          );
          localStorage.setItem('userId', data.data._id);
        } catch (error) {
          toast.error('Me Service failed');
          console.error('Me Service error:', error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useMeMutation } = userApi;
