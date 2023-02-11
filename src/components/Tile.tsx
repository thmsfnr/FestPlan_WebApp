
import React, { useState } from 'react'

/**
 * Props of the component
 */
type Props = {
    parent: () => void;
    name: string;
}

/**
 * Compoment to display an element
 * @param parent A function to inform the parent component that an element is selected
 * @param name The name of the element to display
 */
const Tile: React.FC<Props> = ({ parent, name }) => {
    const [isHover, setIsHover] = useState(false);

    // CSS-In-JS style attributes (to have a completely autonomous component)
    const styles = {
        tile: {
            "padding": "20px",
            "paddingLeft": "0px",
            "paddingRight": "0px",
            "margin": "10px",
            "borderRadius": "10px",
            "width": "200px",
            "transition": "0.7s",
            "cursor": "pointer",
            "display": "flex",
            "justifyContent": "center",
            "transform": isHover ? "translateX(10px) translateY(-10px)" : "",
            "backgroundColor": isHover ? "#d9d9d9" : "#E6E6E6",
        }
    }

    return (
        <div className="container">
            <section style={styles.tile} key={name} onClick={() => parent()} onMouseEnter={() => {setIsHover(true)}} onMouseLeave={() => {setIsHover(false)}}>
                <h6>{name}</h6>
            </section>
        </div>
    );
};

export default Tile;
