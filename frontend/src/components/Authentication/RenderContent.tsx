import React from 'react'
import { AuthorizedRoles } from '../../contracts/constants/roleConstant'
import { useUserContext } from '../../context/User'

interface IRenderContent {
    authorizedRole: AuthorizedRoles[],
    children: React.ReactNode
}

const RenderContent: React.FC<IRenderContent> = ({ authorizedRole, children }) => {

    const { user } = useUserContext()

    if (user && authorizedRole.includes(user.role)) {
        return <> {children}</>
    }

    return (

        <></>
    )
}

export default RenderContent