# Todo App

TanStack Query 학습을 위한 Todo App

## 🛠 Tech Stacks

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.90-FF4154?style=flat-square&logo=react-query&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.81-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-6.1-DB7093?style=flat-square&logo=styled-components&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-0.554-F97316?style=flat-square&logo=lucide&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.39-4B3A00?style=flat-square&logo=eslint&logoColor=white)

## 📋 Overview

TanStack Query의 핵심 개념들을 학습하는 것을 목표로 한다

## 📗 Learnig Point
-  **Data Fetching**: `useQuery`를 사용한 효율적인 데이터 조회
-  **Mutation**: `useMutation`을 사용한 데이터 변경 작업
-  **Optimistic Update**: 서버 응답 전에 UI를 미리 업데이트
-  **Caching**: 자동 캐싱 및 캐시 무효화
-  **Invalidating Queries**: `queryClient.invalidateQueries`를 통한 데이터 동기화

## ✨ Features

- 📝 Todo CRUD
  - 💨 낙관적 업데이트로 즉시반영 
  - 🔄 Todo 상태 변경 (pending → inProgress → completed)
- 🔍 Todo Filtering (ALL, PENDING, IN PROGRESS, COMPLETED)

## 🚀 Quick Start

### Installation

```bash
yarn install
```

### Development Server

```bash
yarn dev
```

### Build

```bash
yarn build
```


## 📁 Structure(tmp)

```
src/
├── Todo/
│   ├── Todo.jsx          # 메인 Todo 컴포넌트
│   ├── TodoForm.jsx      # Todo 입력 폼
│   ├── TodoList.jsx      # Todo 목록 표시
│   ├── TodoFilter.jsx    # 필터 버튼
│   └── useTodos.js       # TanStack Query 훅
├── App.jsx
└── main.jsx
```


## 📚 TanStack Query 

### Data Fetching By UseQuery

```javascript
const todoQuery = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  initialData: [],
  select: (data) => ({
    pending: data.filter((todo) => todo.status === "pending"),
    inProgress: data.filter((todo) => todo.status === "inProgress"),
    completed: data.filter((todo) => todo.status === "completed"),
  }),
});
```

### Optimistic Update

```javascript
const addMutation = useMutation({
  mutationFn: addTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });
    const prevTodos = queryClient.getQueryData(["todos"]);
    const optimisticTodo = {
      ...newTodo,
      id: Date.now(),
    };
    queryClient.setQueryData(["todos"], (old) =>
      old ? [...old, optimisticTodo] : [optimisticTodo]
    );
    return { prevTodos };
  },
  onError: (context) => {
    queryClient.setQueryData(["todos"], context.prevTodos);
  },
});
```

## 🔗 참고 자료

- [TanStack Query Official Docs](https://tanstack.com/query/latest)
- [Supabase Official Docs](https://supabase.com/docs)

