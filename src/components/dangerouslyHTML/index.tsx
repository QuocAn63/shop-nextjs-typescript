import { FC, HTMLAttributes } from "react"

const DangerouslyHTML : FC<HTMLAttributes<HTMLDivElement> & {content: string}> = ({content, ...props}) => <div dangerouslySetInnerHTML={{__html: content}} />

export default DangerouslyHTML
