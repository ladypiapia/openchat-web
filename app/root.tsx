import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useNavigation,
} from "react-router";
import { Provider } from "~/components/ui/provider";
import { Toaster } from "~/components/ui/toaster";
import { GlobalLoading } from "~/components/global-loading";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="zh" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<script
					defer
					src="https://u.pexni.com/script.js"
					data-website-id="def9294d-d8fe-48d8-a985-4251f74bb49a"
				/>
			</body>
		</html>
	);
}

const queryClient = new QueryClient();

export default function App() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	return (
		<QueryClientProvider client={queryClient}>
			<Provider>
				<Outlet />
				<Toaster />
				{isNavigating && <GlobalLoading />}
			</Provider>
		</QueryClientProvider>
	);
}
