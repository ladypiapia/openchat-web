import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { BotIcon, BrushIcon, MessageSquareIcon, UserIcon } from "lucide-react";
import {
	NavLink,
	Outlet,
	useLocation,
	useMatches,
	useNavigate,
} from "react-router";
import { Button } from "~/components/ui/button";

const navigations = [
	{ href: "/", title: "首页", icon: <MessageSquareIcon /> },
	{ href: "/images/", title: "绘画", icon: <BrushIcon /> },
	{ href: "/account/", title: "我的", icon: <UserIcon /> },
];

export default function HomeLayout() {
	const matches = useMatches();

	const location = useLocation();
	const navigate = useNavigate();

	// @ts-ignore
	const deep = matches.some((match) => match.handle?.deep);

	return (
		<Stack flexDir={{ base: "column", md: "row" }} h="dvh">
			<VStack
				display={{ base: "none", md: "flex" }}
				p={2}
				gap={2}
				borderRightWidth="1px"
				borderColor="bg.muted"
				bgColor="bg.subtle"
			>
				<HStack py={4}>
					<BotIcon />
				</HStack>
				{navigations.map((item) => {
					let isActive = location.pathname === item.href;
					if (item.href === "/" && location.pathname === "/chat/") {
						isActive = true;
					}
					if (
						item.href === "/images/" &&
						location.pathname === "/images/new/"
					) {
						isActive = true;
					}
					return (
						<NavLink
							key={`nav-${item.href}`}
							to={item.href}
							viewTransition
							prefetch="viewport"
						>
							{() => {
								return (
									<Button aspectRatio="square" h="fit" variant="ghost">
										<VStack p={1} gap={0.5} color={isActive ? "blue.500" : ""}>
											{item.icon}
											<Text fontSize="smaller" fontWeight="normal">
												{item.title}
											</Text>
										</VStack>
									</Button>
								);
							}}
						</NavLink>
					);
				})}
			</VStack>
			<Outlet />
			<HStack
				display={{ base: deep ? "none" : "flex", md: "none" }}
				p={2}
				gap={2}
				bgColor="bg.subtle"
			>
				{navigations.map((item) => {
					let isActive = location.pathname === item.href;
					if (item.href === "/" && location.pathname === "/chat") {
						isActive = true;
					}
					return (
						<NavLink
							key={`nav-${item.href}`}
							to={item.href}
							viewTransition
							prefetch="viewport"
							style={{ width: "100%" }}
						>
							{() => {
								return (
									<Button aspectRatio="square" w="full" variant="plain">
										<VStack gap={0} color={isActive ? "blue.500" : ""}>
											{item.icon}
											<Text fontSize="smaller" fontWeight="normal">
												{item.title}
											</Text>
										</VStack>
									</Button>
								);
							}}
						</NavLink>
					);
				})}
			</HStack>
		</Stack>
	);
}
