import "../styles/globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
	weights: [400, 500, 600, 700],
	styles: ["normal", "italic"],
	subsets: ["latin"],
});
function MyApp({ Component, pageProps }) {
	return (
		<main className={manrope.className}>
			<Component {...pageProps} />
		</main>
	);
}

export default MyApp;
