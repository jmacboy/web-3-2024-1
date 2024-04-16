import './App.css'
import ClientForm from './pages/ClientForm'
import ClientList from './pages/ClientList'

interface AppProps {
  title: string
}
const App = ({ title }: AppProps) => {

  return (
    <>
      {title}
    </>
  )
}

export default App
