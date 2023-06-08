import FormLogin from "@/components/forms/FormLogin";

export default function Login() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row mt-5">
        <div className="col-md-3 col-12"></div>
        <div className="col-md-6 col-12 login-form pt-4 pb-4">
          <div className="container">
            <div className="row text-white ">
              <FormLogin />
            </div>
          </div>
        </div>
        <div className="col-md-3 col-12"></div>
      </div>{" "}
      <div className="row mb-5 pb-3"></div>
    </div>
  );
}
