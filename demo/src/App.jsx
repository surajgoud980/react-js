//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
// Create a client
// import {
//   // useQuery,
//   // useMutation,
//   // useInfiniteQuery,
//   // useDebounce,
//   // usePrefetchQuery,
//   // useMutation,
//   // useErrorBoundary,
//   // useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/eslint-plugin-query'
import {QueryClient,
  QueryClientProvider, } from '@tanstack/react-query';

import Todos from './pages/todos/Todos'

const queryClient = new QueryClient()
function App() { 
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
    </>
  )
}

export default App
