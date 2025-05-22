import { Textarea } from "./ui/textarea"

export const DisplayComponent = ({textFromImage}: {textFromImage: string}) => {
    return (
    <>
        <Textarea disabled value={textFromImage}></Textarea>
    </>
)}