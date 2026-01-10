import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/common/NavBar";
import Footer from "./components/common/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "./components/common/Container";
import { Toaster } from "sonner";

const Outlets = () => {
  const params = useLocation();
  const notAllowedNavars = ["/login", "/register", "/searchpage", "/admin"];

  return (
   <>
    <Container>
      {notAllowedNavars.includes(params.pathname) ? undefined : (
        <div className="container mx-auto">
          <Navbar />
        </div>
      )}
      <Outlet />
      {notAllowedNavars.includes(params.pathname) ? undefined : <Footer />}
    </Container>
    <Toaster/>
   </>
  );
};

export default Outlets;
