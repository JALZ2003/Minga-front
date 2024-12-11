import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export default function Main() {
  return (
    <>
      <Navbar />
      {/* contenido dinamico de cada vista */}
      <Outlet />
      <Footer />
    </>
  )
}
