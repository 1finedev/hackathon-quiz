import Link from "next/link";

import { useSession } from "next-auth/react";

const Home = () => {
	return (
		<div className="">
			<h1>
				User registers first. After registration, they are redirected{" "}
				<Link href="/onboarding">to the onboarding scren</Link>{" "}
			</h1>
		</div>
	);
};

export default Home;

//  to protect this page from unauthorized access
// Home.auth = true;
