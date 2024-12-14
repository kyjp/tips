export default () => {
    return (
        <Layout>
            <Template>
                <ErrorBoundary fallback={<Error />}>
                    <Suspence fallback={<Loading />}>
                        <ErrorBoundary fallback={NotFound />}>
                            <Page/>
                        </ErrorBoundary>
                    </Suspence>
                </ErrorBoundary>
            </Template>
        </Layout>
    )
}

// ネストされた場合
export default () => {
    return (
        <Layout>
            <ErrorBoundary fallback={<Error />}>
                <Suspence fallback={<Loading />}>
                    <Layout>
                        <Template>
                            <ErrorBoundary fallback={<Error />}>
                                <Suspence fallback={<Loading />}>
                                    <ErrorBoundary fallback={NotFound />}>
                                        <Page/>
                                    </ErrorBoundary>
                                </Suspence>
                            </ErrorBoundary>
                        </Template>
                    </Layout>
                </Suspence>
            </ErrorBoundary>
        </Layout>
    )
}