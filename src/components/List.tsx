import React from "react";

type Props = {
    parent: (elem : string) => void;
    content: string[];
}

const List: React.FC<Props> = ({ parent, content}) => {

    return (
        <div className="container">
            <div>
                {content.map((item: string) => (
                    <div key={item} onClick={() => parent(item)}>
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default List;