type ErrorPageProps = {
	statusCode?: number;
};

export function ErrorPage({ statusCode = 404 }: ErrorPageProps) {
	return <div>{statusCode}</div>;
}
