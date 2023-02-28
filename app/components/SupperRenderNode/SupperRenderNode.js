import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

function SupperRenderNode({ data, handlePerformActions, RenderChildren = () => {}, children }) {
    return (
        <table className="table">
            {children}
            {data &&
                data.length > 0 &&
                data.map((item, index) => {
                    const id = uuidv4();

                    return (
                        <RenderChildren
                            index={index}
                            handlePerformActions={handlePerformActions}
                            item={item}
                            key={id}
                        />
                    );
                })}
        </table>
    );
}

SupperRenderNode.propTypes = {
    data: PropTypes.array.isRequired,
    handlePerformActions: PropTypes.func.isRequired,
    children: PropTypes.node,
    RenderChildren: PropTypes.node,
};

export default SupperRenderNode;
