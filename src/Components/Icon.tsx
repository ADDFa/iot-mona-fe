import { FC } from "react"

const Icon: FC<IconI> = ({ icon }) => {
    const iconName = `bi bi-${icon}`

    return <i className={iconName}></i>
}

export default Icon
