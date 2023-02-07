
import React from "react";

/**
 * Props of the component
 */
type Props = {
    parent: (elem : string) => void;
    content: string[];
}

/**
 * Compoment to display a list of elements
 * @param parent A function to inform the parent component that an element is selected
 * @param content The list of elements to display
 */
const List: React.FC<Props> = ({ parent, content}) => {
    return (
        <div className="container">
            <section style={styles.list}>
                {content.map((item: string) => (
                    <div style={styles.tile} key={item} onClick={() => parent(item)}>
                        <h5>{item}</h5>
                    </div>
                ))}
            </section>
        </div>
    );
};

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
    list: {
        "display": "flex",
        "flex-wrap": "wrap",
        "alignItems": "center",
    },
    tile: {
        "backgroundColor": "#e1e1ea",
        "padding": "30px",
        "margin": "30px",
        "borderRadius": "10px",
    }
}

export default List;