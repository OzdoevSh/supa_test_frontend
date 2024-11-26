import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5050/' }),
  endpoints: (builder) => ({
    getIssues: builder.query({
      query: (args) => `issues?user=${args.user}&repo=${args.repo}&limit=${args.limit}&offset=${args.offset}`,
    }),
    getOneIssue: builder.query({
      query: (args) => `issues/${args.number}?user=${args.user}&repo=${args.repo}`,
    }),
    getLogs: builder.query({
      query: (args) => `logs?page=${args.page}&limit=${args.limit}`,
    }),
  }),
});

export const { useLazyGetIssuesQuery, useGetOneIssueQuery, useGetLogsQuery } = githubApi;
