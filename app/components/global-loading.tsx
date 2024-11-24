import { ProgressBar, ProgressRoot } from "~/components/ui/progress";

export function GlobalLoading() {
	return (
		<ProgressRoot
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
