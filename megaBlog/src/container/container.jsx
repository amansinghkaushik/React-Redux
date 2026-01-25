import React from "react";

function Container({ children }) {
    return (
        <div className="w-full px-6 md:px-8 lg:px-12">
            {children}
        </div>
    );
}

export default Container;
