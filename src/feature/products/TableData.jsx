import React from 'react'


const TableData = ({each}) => {

    return (
        <tr>
            <td className="px-2 py-4 whitespace-nowrap">
                <div className="d-flex justify-content-left align-items-center text-center">
                    <a href="/">
                        <img src="" className="me-3 table-image my-image" alt="" />
                    </a>
                    <p className="symbol name-symbol">{ each.name }</p>
                </div>
            </td>
            <td className="px-2 py-4 whitespace-nowrap">
                <p className="symbol">{ each.price}</p>
            </td>
            <td className="px-2 py-4 whitespace-nowrap">
                <p className="symbol">{each.category}</p>
            </td>
            <td className="px-2 py-4 whitespace-nowrap">
                <p className="symbol">{each.quantity}</p>
            </td>
        </tr>
    )
}

export default TableData