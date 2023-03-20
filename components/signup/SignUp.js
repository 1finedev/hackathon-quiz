import { setConfig } from "next/config";

function SignUp() {
  return (
    <section>
      <h1>Get Started</h1>
      <p>
        Sign up to get screened for the quiz to participate in the hackathon 4.0
      </p>
      <form>
        <div>
          <label>WhatsApp Name</label>
          <input type="text" placeholder="@samplename" required />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="tel" placeholder="09036235456" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="......" required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" placeholder="......" required />
        </div>
        <button>Register</button>
      </form>
    </section>
  );
}

export default SignUp;
