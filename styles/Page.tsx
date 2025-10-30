import { PageErrorBoundary } from "components/errors";
import { StickyMenuContainer } from "./layout";
import { Header } from "components/Header";
import { Menu } from "components/Menu";

type PageProps = {
    children: React.ReactNode;
    title?: string;
}

export const Page = (props: PageProps) => {
    return (
        <PageErrorBoundary>
            <div className="outer-container">
                <div className="header-container">
                    <Menu title={props.title ? props.title : "T&F"}/>

                    <div className="styled-content-container">
                        {props.title && (
                            <Header textAlign="center" size="large">
                                {props.title}
                            </Header>
                        )}
                        <div style={{ paddingTop: props.title ? "0" : "28px" }}>
                        {props.children}
                        </div>
                    </div>
                </div>
                <StickyMenuContainer>
                    <div></div>
                </StickyMenuContainer>
            </div>

            <style jsx={true}>
            {`
                .outer-container {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .header-container {
                    margin-left: 20px;
                }

                .styled-content-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 20px;
                }
            `}
            </style>
        </PageErrorBoundary>
    )
}