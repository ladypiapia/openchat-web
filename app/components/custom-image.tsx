import { type ImgHTMLAttributes, useEffect, useState } from "react";
import { blurHashToDataURL } from "~/utils/blurhash-to-dataurl";

export interface props extends ImgHTMLAttributes<HTMLImageElement> {
	blurhash: string;
}

export default function CustomImage(props: props) {
	const { blurhash } = props;
	const blurhashDataUrl = blurHashToDataURL(blurhash) as string;
	const [src, setSrc] = useState(blurhashDataUrl);

	useEffect(() => {
		const img = new Image();
		img.src = props.src as string;
		img.onload = () => {
			setSrc(img.src);
		};
	}, [props.src]);

	return <img {...props} src={src} alt={props.alt} />;
}
