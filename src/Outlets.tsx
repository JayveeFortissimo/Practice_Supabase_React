import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import supabase from "./Supabase";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import SpinnerCircle2 from "./components/common/Loading";
import Container from "./components/common/Container";
import { Navbar } from "@/components/common/NavBar";
import Footer from "./components/common/Footer";

import { setAccesToken, setLoading } from "./store/authentication";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/storeMain";
import { useNavigate } from "react-router-dom";

const Outlets = () => {
  const params = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user_id } = useSelector(
    (state: RootState) => state.userAuthentication,
  );
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
          }),
        );
      } catch (error) {
        toast.error("Have Error, Please try again");
        console.log(error);
        dispatch(setLoading(false));
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (user_id === undefined && params.pathname === "/profile") {
      return navigate("/login");
    }
  }, [params.pathname, user_id, navigate, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <SpinnerCircle2 />
      </div>
    );
  }

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
