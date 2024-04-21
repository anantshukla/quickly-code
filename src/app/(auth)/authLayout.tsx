import React from "react";

type AuthLayoutProps = {
	children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
	<div className="flex">
		<div
			style={{
				flex: "1",
				position: "fixed",
				left: "0",
				top: "0",
				height: "100vh",
				width: "65%",
				backgroundImage: "url(/images/img.jpg)",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			className="hidden lg:block"
		/>
		<div style={{ flex: "1", marginLeft: "65%" }}>
			<div className="p-8 overflow-y-auto" style={{ height: "100vh" }}>
				<div className="container mx-auto">{children}</div>
			</div>
		</div>
	</div>
);

export default AuthLayout;
