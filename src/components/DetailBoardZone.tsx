
import React, { useState, useEffect } from "react";

/**
 * Props of the component
 */
type Props = {
    parent: () => void
    content: any
}

/**
 * Component to display volunteers and slots of a selected zone
 * @param parent A function to return to the parent component
 * @returns 
 */
const DetailBoardZone: React.FC<Props> = ({ parent, content }) => {

    return (
        <div className="container"></div>
    )
}

export default DetailBoardZone
