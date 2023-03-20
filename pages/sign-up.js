import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function SignUp() {
  const router = useRouter();
  const [values, setValues] = useState({
    whatsappName: "",
    mobile: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // basic input validation

    if (!values.mobile.includes("+")) {
      toast.error("Phone number must include +countryCode!");
      return;
    }
    if (values.mobile.length < 13) {
      toast.error("Phone number invalid or incomplete!");
      return;
    }

    if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (values.password !== values.passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    // send data to backend
    setLoading(true);
    axios
      .post("/api/auth/signup", values)
      .then((res) => {
        toast.success(res.data.message);
        router.push("/sign-in");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
    setLoading(false);
  };
  return (
    <section className="sign-up">
      <div className="text-center space-y-2">
        <h1>Get Started</h1>
        <p>
          Sign up to get screened for the quiz to participate in the hackathon
          4.0
        </p>
      </div>
      <form className="mt-4" onSubmit={handleSignup}>
        <div>
          <label>WhatsApp Name</label>
          <input
            type="text"
            placeholder="@whatsappname"
            required
            onInput={(e) =>
              setValues((prevValues) => ({
                ...prevValues,
                whatsappName: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="+2349036235456"
            required
            onInput={(e) =>
              setValues((prevValues) => ({
                ...prevValues,
                mobile: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            required
            onInput={(e) =>
              setValues((prevValues) => ({
                ...prevValues,
                password: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Password again"
            required
            onInput={(e) =>
              setValues((prevValues) => ({
                ...prevValues,
                passwordConfirm: e.target.value,
              }))
            }
          />
        </div>
        <button
          className="mt-6 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
        >
          Register
        </button>
      </form>
    </section>
  );
}

export default SignUp;
