import { FunctionComponent } from "react";


interface LoadingProps {

}

const Loading: FunctionComponent<LoadingProps> = () => {
    return (
        <div className="loading">
            <div className="loading-screen">
                <div className="lds-heart">
                    <div>  </div>
                </div>
                <p> Happy Women's Day</p>
            </div>
        </div>
    );
}

export default Loading;