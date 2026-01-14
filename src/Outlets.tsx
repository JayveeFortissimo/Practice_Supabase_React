import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import supabase from "./Supabase";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

import Container from "./components/common/Container";
import { Navbar } from "@/components/common/NavBar";
import Footer from "./components/common/Footer";

import { setAccesToken, setLoading } from "./store/authentication";
import { useDispatch } from "react-redux";

const Outlets = () => {
  const params = useLocation();
  const dispatch = useDispatch();
  const notAllowedNavars = ["/login", "/register"];

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await supabase.auth.getSession();
        dispatch(
          setAccesToken({
            accessToken: data.session?.access_token as string,
            userId: data.session?.user.id as string,
          })
        );
      } catch (error) {
        toast.error("Have Error, Please try again");
        console.log(error);
        dispatch(setLoading(false));
      } finally {
        dispatch(setLoading(false));
      }
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
