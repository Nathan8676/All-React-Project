import { Provider } from 'react-redux'
import { store } from './App/store'
import './App.css'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {

  const mypersistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={mypersistor}>
      <h1>React react-redux</h1>
      <AddTodo />
      <Todos />
      </PersistGate>
    </Provider>
  )
}

export default App
