import { VStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import api from "~/api";
import { Avatar } from "~/components/ui/avatar";
import { ColorModeButton } from "~/components/ui/color-mode";
import { Skeleton } from "~/components/ui/skeleton";

export default function Account() {
	const { data: account, isPending: isAccountPending } = useQuery({
		queryKey: ["account"],
		queryFn: async () => {
			return api.account();
		},
	});
	return (
		<VStack flex={1} p={4} w="full" maxW="4xl" mx="auto">
			<Avatar size="xl" />
			{isAccountPending ? (
				<Skeleton w={20} height={6} />
			) : (
				<Text fontWeight="bold" fontSize="xl">
					{account?.username}
				</Text>
			)}
			<ColorModeButton />
		</VStack>
	);
}
