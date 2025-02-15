import React, { useState } from "react";
import "./style.scss"
import { toast } from "react-toastify";

// const tableRow = {
//     id: "ID",
//     name: "Name",
//     description: "Description",
//     createdAt: "Created At",
//     owner: "Owner",
//     age: "Age",
//     place: "Place",
//     company: "Company",
//     stamp: "Stamp"
// }


// type ITableRow = typeof tableRow
type ITableRow = {
    [key: string]: string;
}

// const tableData = [
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     }
// ]

interface ICommontable {
    tableRow: ITableRow;
    tableData: any[];
    noData?: string;
    openDetail?: boolean,
    ignoreVerificationSubmitted?: boolean
    // openedContent?: React.ReactNode
}

const CommonTable: React.FC<ICommontable> = ({ tableRow, tableData, noData, openDetail, ignoreVerificationSubmitted }) => {

    const [showDetail, setShowDetail] = useState<number[]>([])


    const toggleShow = (index: number, isVerificationSubmitted: boolean) => {
        if (!isVerificationSubmitted && !ignoreVerificationSubmitted) {
            toast("Organizer has not completed the verification form.", {
                type: "error",
                theme: "colored"
            })

            return
        }
        if (showDetail.includes(index)) {
            const updated = showDetail?.filter(n => n != index);
            setShowDetail(updated)
        } else {
            setShowDetail([...showDetail, index])
        }
    }

    const isOpened = (index: number) => showDetail.includes(index)

    return <div className="common-table">
        <table style={{
            ...(tableData.length === 0 ? { minHeight: "500px" } : {})
        }}>

            <thead>
                <tr>
                    {Object.entries(tableRow).map(([_key, value]: [string, string], index: number) => {
                        return <th key={index}>{value}</th>;
                    })}
                    {openDetail && <>
                        <th>Views</th>
                        <th>Trip By</th>
                    </>}
                </tr>
            </thead>
            <tbody>
                {
                    tableData.map((rowData: ITableRow, index) => {
                        return <React.Fragment key={index}> <tr key={index}>
                            {Object.entries(tableRow).map(([key, _value]: [string, string], index: number) => {
                                return <td key={index}>{rowData?.[key]}</td>;
                            })}
                            {openDetail && <>
                                <td className="view" onClick={() => toggleShow(index, !!rowData.isVerificationSubmitted as boolean)}>
                                    {isOpened(index) ? <i className="fas fa-eye-slash"></i> : <i className="far fa-eye"></i>}
                                </td>
                            </>}

                        </tr>
                            {isOpened(index) && <tr>
                                <td className="td-content" colSpan={+Object.entries(tableRow)?.length + 1}>

                                    {rowData?.openedContent}
                                </td>
                            </tr>}


                        </React.Fragment>
                    })
                }
                {tableData.length === 0 && <tr className="no-data-row"><h4>
                    {noData ? noData : "No data found !"}

                </h4></tr>}

            </tbody>

        </table>
    </div >
}

export default CommonTable
