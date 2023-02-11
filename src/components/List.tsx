
import React from 'react'
import Tile from './Tile';

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
                    <Tile parent={() => parent(item)} name={item} />
                ))}
            </section>
        </div>
    );
};

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
    list: {
        "display": "flex",
        "flex-direction": "column",
        "justifyContent": "center",
        "margin": "30px",
    }
}

export default List;
