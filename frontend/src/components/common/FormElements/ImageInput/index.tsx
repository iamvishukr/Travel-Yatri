import React from 'react'
import classNames from 'classnames';
import "./style.scss"


import { useFormikContext } from 'formik';
import { useUploadFileMutation } from '../../../../redux/services/file';
import { IFileResponse } from '../../../../contracts/IFileResponse';


interface IImageInput {
    name: string;
    label?: string;
    // type: string;
    className?: string,
    value?: string | number,
    inputLabel: string;
    multiple?: boolean
    isDisabled?: boolean
}

const ImageInput: React.FC<IImageInput> = ({ name, label, className, inputLabel, multiple = false, isDisabled }) => {
    const [uploadFile] = useUploadFileMutation()

    const { handleBlur, setFieldValue, values } = useFormikContext()
    // console.log(values, ">>>valies")
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files, ">>>>>> rachna")
            // @TODO check here that all files shoul be image

            const imagePromise = Array.from(e.target.files)?.map((file) => {
                return uploadFile({ file: file }).unwrap()
            })


            Promise.all(imagePromise).then((res) => {
                console.log(res, ">>>>> Image promise response")
                if (multiple) {
                    setFieldValue(name, [...((values as { [key: string]: string })?.[name]), ...res])
                } else {
                    setFieldValue(name, res[0])

                }


            }).catch((error) => {
                console.log(error, "Image promise error.")
            })
            // uploadFile({ file: e.target.files[0] }).unwrap().then((res) => {
            //     console.log(res, "?>>>>>>>>>> file uplokad response")
            //     if (multiple) {
            //         setFieldValue(name, [...((values as { [key: string]: string })?.[name]), res])
            //     } else {
            //         setFieldValue(name, res)

            //     }

            // }).catch((err) => {
            //     console.log(err, ">>>>> err of file upload ")
            // })
        }
    }

    const handleRemove = (id: string) => {
        setFieldValue(name, ((values as any)?.[name])?.filter((item: IFileResponse) => item.id != id))
    }


    return (
        <div className={classNames(['ty-input ty-image-input', className])}>
            {!!label && <label>{label}</label>}
            <div className='custom-image'>
                <label htmlFor={name} className='btn btn-primary'>{inputLabel}</label>
            </div>
            <input disabled={isDisabled} id={name} multiple hidden type="file" onChange={handleUpload} onBlur={handleBlur} name={name} />
            {/* style={{ ...(isDisabled ? { cursor: "not-allowed" } : {}) }} */}
            <div  className='image-list'>
                {multiple ?
                    <>{((values as { [key: string]: string | [] })?.[name] as [])?.map((item: IFileResponse, index: number) => {
                        return <>

                            <div key={index}>
                                {/* style={{ ...(isDisabled ? { pointerEvents: "none", cursor: "not-allowed" } : {}) }} */}
                                <div  className='cut' onClick={() => handleRemove(item.id)}>X</div>
                                <img className='uploaded-img' src={`${import.meta.env.VITE_BACKEND_URL}${item.path}`} />
                            </div>
                        </>
                    })}</>
                    : <>
                        {!!(values as any)?.[name]?.id && <div>
                            <div className='cut' onClick={() => setFieldValue(name, null)}>X</div>
                            <img className='uploaded-img' src={`${import.meta.env.VITE_BACKEND_URL}${(values as any)?.[name]?.path}`} />
                        </div>}
                    </>
                }



            </div>

        </div>
    )
}

export default ImageInput