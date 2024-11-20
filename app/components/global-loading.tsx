import { useNavigation } from "react-router";
import { ProgressBar, ProgressRoot } from "~/components/ui/progress";

export function GlobalLoading() {
	const transition = useNavigation();
	const active = transition.state !== "idle";

	return (
		<ProgressRoot
			hidden={!active}
			pos="fixed"
			value={null}
			top={0}
			zIndex={50}
			shape="square"
			variant="subtle"
			size="xs"
			w="full"
			colorPalette="blue"
		>
			<ProgressBar />
		</ProgressRoot>
	);
}
