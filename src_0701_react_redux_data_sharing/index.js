import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App'

ReactDOM.render(
    <Provider store={store}> 
        <App />
    </Provider>,
    document.getElementById('root'))

    // console.log('store->', store)

// store.subscribe(() => {
//     ReactDOM.render(<BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root'))
// })    