import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import supabase from "./Supabase";
import { useEffect } from "react";
import { Toaster } from "sonner";

import Container from "./components/common/Container";
import { Navbar } from "@/components/common/NavBar";
import Footer from "./components/common/Footer";

import { setAccesToken } from "./store/authentication";
import { useDispatch } from "react-redux";

const Outlets = () => {
  const params = useLocation();
  const dispatch = useDispatch();
  const notAllowedNavars = ["/login", "/register", "/searchpage", "/admin"];

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      dispatch(setAccesToken(data.session?.access_token as string));
    })();
  }, []);

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
      <Toaster />
    </>
  );
};

export default Outlets;
