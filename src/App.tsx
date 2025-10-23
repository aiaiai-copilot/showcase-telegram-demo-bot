import { Toaster } from 'sonner'
import { TelegramDemoCard } from './components/showcase/TelegramDemoCard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <TelegramDemoCard />
      <Toaster position="top-right" />
    </div>
  )
}

export default App
