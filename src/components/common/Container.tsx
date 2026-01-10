const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full max-w-[2100px] mx-auto min-h-screen">
			{children}
		</div>
	);
};

export default Container;