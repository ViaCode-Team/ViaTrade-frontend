type ErrorPageProps = {
	statusCode?: number;
};

export const ErrorPage = ({ statusCode = 404 }: ErrorPageProps) => {
	return <div>{statusCode}</div>;
};

export default ErrorPage;
