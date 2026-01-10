import RegisterForm from "@/components/sections/RegisterForm";

import Container from "@/components/common/Container";

const Register = () => {
  return (
    <Container>
      <div className="min-h-screen bg-[#BD3144] grid grid-cols-1 md:grid-cols-2">
        <section className="relative min-h-[30rem] lg:min-h-screen bg-[#111820] flex flex-col rounded-b-3xl lg:rounded-r-3xl overflow-hidden w-full">
          <h1 className="text-white text-4xl p-10 z-10 text-center lg:text-left font-oleo">
            PRO MUSICIAN
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            {/* <img
              src={LogoImage}
              alt="Logo Image"
              className="h-full w-full max-w-[90%] object-contain"
            /> */}
          </div>
        </section>

        <RegisterForm />
      </div>
    </Container>
  );
};

export default Register;
