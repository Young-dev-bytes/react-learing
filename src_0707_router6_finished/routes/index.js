
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/Home/News'
import Message from  '../pages/Home/Message'
import { Navigate } from 'react-router-dom'
import Details from '../pages/Home/Message/Details'

const ops = [
    {
        path:'/about',
        element:<About />,
    },
    {
        path:'/home',
        element:<Home/>,
        children:[
            {
                path:'message',
                element:<Message/>,
                children:[
                    // {
                    //     path:'detail/:id/:title/:content',
                    //     element:<Details/>
                    // }
                    {
                        path:'detail',
                        element:<Details/>
                    }
                ]
            },
            {
                path:'news',
                element:<News/>
            }
        ]
    },
    {
        path:'/',
        element:<Navigate to='/about' />
    }
]

export default ops