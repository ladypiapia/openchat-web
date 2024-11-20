import { Heading, HStack, Input, Stack, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "~/api";
import { Button } from "~/components/ui/button";
import { Field } from "~/components/ui/field";
import { PasswordInput } from "~/components/ui/password-input";
import { toaster } from "~/components/ui/toaster";
import bgImage from "~/assets/wave02.svg";

const schema = z.object({
	username: z.string().min(1, { message: "用户名不能为空" }),
	password: z.string().min(1, { message: "密码不能为空" }),
});

export default function Signup() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	const navigate = useNavigate();

	const mutation = useMutation({
		mutationKey: ["signin"],
		mutationFn: async (data: z.infer<typeof schema>) => {
			return api.signup(data);
		},
		onSuccess(data) {
			toaster.success({
				title: "注册成功",
				description: "欢迎加入！",
			});
			navigate("/signin");
		},
		onError(error) {
			toaster.error({
				title: "注册失败",
				description: error.message,
			});
		},
	});

	const onSubmit = handleSubmit((data) => mutation.mutate(data));

	return (
		<HStack h="dvh">
			<form
				method="post"
				onSubmit={onSubmit}
				style={{
					width: "100%",
				}}
			>
				<Stack gap="4" p={2} align="flex-start" maxW="md" mx="auto">
					<Heading size="2xl">注册</Heading>
					<Field
						label="用户名"
						invalid={!!errors.username}
						errorText={errors.username?.message}
					>
						<Input {...register("username")} />
					</Field>
					<Field
						label="密码"
						invalid={!!errors.password}
						errorText={errors.password?.message}
					>
						<PasswordInput {...register("password")} />
					</Field>
					<Button
						type="submit"
						w="full"
						loading={mutation.status === "pending"}
					>
						注册
					</Button>
					<HStack fontSize="sm" fontWeight="medium" asChild>
						<Link to="/signin" viewTransition>
							已有账号？立即登录
						</Link>
					</HStack>
				</Stack>
			</form>
			<VStack
				display={{ base: "none", lg: "flex" }}
				w="full"
				h="full"
				style={{
					backgroundImage: `url(${bgImage})`,
					backgroundSize: "cover",
				}}
			/>
		</HStack>
	);
}
