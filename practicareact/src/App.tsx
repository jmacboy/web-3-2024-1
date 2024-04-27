import './App.css'
import ClientForm from './pages/clients/ClientForm'
import ClientList from './pages/clients/ClientList'

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
