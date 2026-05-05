import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Dashboard from './pages/Dashboard.tsx'
import BinaryTree from './pages/BinaryTree.tsx'
import Commissions from './pages/Commissions.tsx'
import Enrollment from './pages/Enrollment.tsx'
import EPinManagement from './pages/EPinManagement.tsx'
import Landing from './pages/Landing.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tree" element={<BinaryTree />} />
        <Route path="/commissions" element={<Commissions />} />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/epins" element={<EPinManagement />} />
      </Route>
    </Routes>
  )
}
