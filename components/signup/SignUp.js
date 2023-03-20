import { setConfig } from "next/config";
import { useState } from "react";

// Regular expression pattern to match phone number with country code
const phoneRegex = /^\+\d{1,3}\d{10}$/;

function SignUp() {
  const [whatsappName, setWhatsappName] = useState({
    name: "",
    hasError: false,
  });
  const [phone, setPhone] = useState({ phone: "", hasError: false });
  const [password, setPassword] = useState({
    password: "",
    hasError: false,
  });
  const [confirmPass, setConfirmPass] = useState({
    confirmPass: "",
    hasError: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.password !== confirmPass.confirmPass) {
      
        setConfirmPass({ ...confirmPass, hasError: true });
        return
    } else {
      setConfirmPass({ ...confirmPass, hasError: false });
      return
    }
    if (phoneRegex.test(phone.phone)) {
      console.log(phoneRegex.test(phone.phone));
      
      setPhone({ ...phone, hasError: false });
      return
    } else {
      setConfirmPass({ ...confirmPass, hasError: true });
      return
    }

    // console.log(password, confirmPass, phone);
  };

  return (
    <section>
      <h1>Get Started</h1>
      <p>
        Sign up to get screened for the quiz to participate in the hackathon 4.0
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>WhatsApp Name</label>
          <input
            type="text"
            placeholder="@whatsappname"
            value={whatsappName.name}
            required
            onChange={(e) =>
              setWhatsappName({ ...whatsappName, name: e.target.value })
            }
          />
          {whatsappName.hasError && (
            <p className="text-red-500">Name cannot be empty</p>
          )}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="09036235456"
            required
            value={phone.phone}
            onChange={(e) => setPhone({ ...phone, phone: e.target.value })}
          />
          {phone.hasError && (
            <p className="text-red-600">
              Phone number should start with your country code
            </p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="......"
            required
            value={password.password}
            onChange={(e) =>
              setPassword({ ...password, password: e.target.value })
            }
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="......"
            required
            value={confirmPass.confirmPass}
            onChange={(e) =>
              setConfirmPass({ ...confirmPass, confirmPass: e.target.value })
            }
          />
          {confirmPass.hasError && (
            <p className="text-red-600">Passwords do not match</p>
          )}
        </div>
        <button>Register</button>
      </form>
    </section>
  );
}

export default SignUp;
