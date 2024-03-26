import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../src/assets/style/main.css'



import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'

import { store } from './store/store.js'
import { HomePage } from './pages/HomePage.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
// import { ToyEdit } from './pages/ToyEdit.jsx'
// import { ToyDetails } from './pages/ToyDetails.jsx'


export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            {/* <Route element={<AboutUs />} path="/about" /> */}
                            <Route element={<ToyIndex />} path="/toy" />
                            {/* <Route element={<ToyEdit />} path="/toy/edit" /> */}
                            {/* <Route element={<ToyEdit />} path="/toy/edit/:toyId" /> */}
                            {/* <Route element={<ToyDetails />} path="/toy/:toyId" /> */}
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>

    )
}
