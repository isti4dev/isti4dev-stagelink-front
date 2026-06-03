import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RegisterStudent from "./pages/RegisterStudent"
import OfferList from "./pages/OfferList"
import OfferDetail from "./pages/OfferDetail"
import Apply from "./pages/Apply"
import DashboardStudent from "./pages/DashboardStudent"
import DashboardCompany from "./pages/DashboardCompany"
import CreateOffer from "./pages/CreateOffer"
import AdminDashboard from "./pages/AdminDashboard"
import About from "./pages/About"
import Contact from "./pages/Contact"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register/student" element={<RegisterStudent />} />
      <Route path="/offers" element={<OfferList />} />
      <Route path="/offers/create" element={<CreateOffer />} />
      <Route path="/offers/:id" element={<OfferDetail />} />
      <Route path="/offers/:id/apply" element={<Apply />} />
      <Route path="/dashboard/student" element={<DashboardStudent />} />
      <Route path="/dashboard/company" element={<DashboardCompany />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
