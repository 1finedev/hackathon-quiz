import "../styles/globals.css";
import "../public/assets/main.css"
import { Manrope } from "next/font/google";
import Layout from "../components/Layout/Layout";

const manrope = Manrope({
	weights: [400, 500, 600, 700],
	styles: ["normal", "italic"],
	subsets: ["latin"],
});
function MyApp({ Component, pageProps }) {
	return (
		<Layout className={manrope.className}>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
