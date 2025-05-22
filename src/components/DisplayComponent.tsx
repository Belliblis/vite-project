import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

export const DisplayComponent = ({textFromImage}: {textFromImage: string}) => {
    return (
    <>
    <div className="space-y-2 space-x-2">
    <Label>Результат</Label>
    <Textarea disabled value={textFromImage}></Textarea>
    </div>
        
    </>
)}