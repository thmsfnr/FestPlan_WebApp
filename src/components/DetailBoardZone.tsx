
import React, { useState, useEffect } from "react";

/**
 * Props of the component
 */
type Props = {
    parent: () => void
    content: any
}

const DetailBoardZone: React.FC<Props> = ({ parent, content }) => {

    return (
        <div className="detail-board-zone">
            <p>{content}</p>
        </div>
    )
}

export default DetailBoardZone
