import React from 'react';
import './App.css';
import Main from './components/Main';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const defaultState = {
  tag: 'home',
}
const reducer = (state = defaultState, action) => {
  switch(action.type){
    case 'home': 
      return {...state, tag: 'home'}
    case 'userManage': 
      return {...state, tag: 'userManage'}
    case 'userTagManage':
      return {...state, tag: 'userTagManage'}
    case 'depManage': 
      return {...state, tag: 'depManage'}
    case 'mapLockerManage':
      return {...state, tag: 'mapLockerManage'}
    case 'userLockerManage':
      return {...state, tag: 'userLockerManage'}
    case 'buildingManage':
      return {...state, tag: 'buildingManage'}
      case 'levelManage': 
      return {...state, tag: 'levelManage'}
    case 'ctlManage':
      return {...state, tag: 'ctlManage'}
    case 'lockerManage': 
      return {...state, tag: 'lockerManage'}
    case 'layoutManage':
      return {...state, tag: 'layoutManage'}
    case 'reportRealtime': 
      return {...state, tag: 'reportRealtime'}
    case 'reportStatus': 
      return {...state, tag: 'reportStatus'}
    case 'reportHistory': 
      return {...state, tag: 'reportHistory'}
    case 'managerManage': 
      return {...state, tag: 'managerManage'}
    case 'roleManage': 
      return {...state, tag: 'roleManage'}
    case 'warning': 
      return {...state, tag: 'warning'}
    default: 
      return state;
  }
}

const store = createStore(reducer);


function App() {
  // if ((localStorage.getItem('token') !== '') && (typeof (localStorage.getItem('token'))) !== 'undefined' && (localStorage.getItem('token') != null)) {
  //   return (
  //     <Main page={'content'} />
  //   );
  // }
  // else {
    return (
      <Provider store={store}>
        <Main page={'login'} />
      </Provider>
    )
  // }
}

export default App;
